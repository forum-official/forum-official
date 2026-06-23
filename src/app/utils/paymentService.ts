import { isNativeApp } from "@/app/utils/platform";
import { toast } from "sonner";
import { supabase } from "@/app/utils/supabaseClient";

// 결제 환경설정 상수
const TOSS_CLIENT_KEY = "test_ck_D5maO0j8minmqQ5oRGRb39zGqLgL";
const REVENUECAT_API_KEY = "goog_sdk_api_key_placeholder";

export interface PaymentRequest {
  skinId: string;
  skinName: string;
  price: number; // 원화 결제 금액 (예: 4900)
  userNickname: string;
  userId: string;
}

export interface PaymentResult {
  success: boolean;
  message: string;
  transactionId?: string;
  paymentKey?: string;
  orderId?: string;
}

// 1. 토스페이먼츠(Web) 결제 트리거
const requestTossPayment = async (req: PaymentRequest): Promise<PaymentResult> => {
  try {
    const { loadTossPayments } = await import("@tosspayments/payment-sdk");
    const tossPayments = await loadTossPayments(TOSS_CLIENT_KEY);
    const orderId = `order_${req.skinId}_${Date.now()}`;

    // Vite/SPA 환경에서는 성공 시 현재 URL 뒤에 쿼리 스트링으로 Toss 결제 정보가 반환됩니다.
    // 이를 라우터나 App.tsx에서 캐치하여 Edge Function 검증을 태웁니다.
    const redirectOrigin = window.location.origin;
    const successUrl = `${redirectOrigin}?payment_status=success&skinId=${req.skinId}&orderId=${orderId}`;
    const failUrl = `${redirectOrigin}?payment_status=fail`;

    await tossPayments.requestPayment("카드", {
      amount: req.price,
      orderId,
      orderName: `${req.skinName} 스킨 구매`,
      customerName: req.userNickname,
      successUrl,
      failUrl,
    });

    // 리다이렉트가 일어나므로 이 프로미스는 완료되지 않고 페이지가 이동합니다.
    return { success: true, message: "토스페이먼츠 결제창으로 이동합니다." };
  } catch (error: any) {
    console.error("Toss Payments request failed:", error);
    return { success: false, message: error.message || "토스 결제창을 여는 데 실패했습니다." };
  }
};

// 2. RevenueCat(Native App) 결제 트리거
const requestRevenueCatPayment = async (req: PaymentRequest): Promise<PaymentResult> => {
  try {
    // 런타임에만 purchases-capacitor 플러그인을 로드하여 웹 컴파일 오류 예방
    const { Purchases } = await import("@revenuecat/purchases-capacitor");
    
    // RevenueCat 초기화 및 샌드박스 설정
    await Purchases.configure({
      apiKey: REVENUECAT_API_KEY,
      appUserID: req.userId,
    });

    // 구글 플레이스토어 인앱결제용 프로덕트 ID 매핑
    const productId = `skin_premium_${req.skinId}`;

    toast.info("구글 플레이스토어 결제를 진행합니다 (테스트 샌드박스)...");
    
    // RevenueCat 상품 구매 요청
    const purchaseResult = await Purchases.purchaseProduct({
      productIdentifier: productId
    });

    // 결제 거래 ID 획득 (Sandbox)
    const transactionId = purchaseResult.purchaserInfo.nonSubscriptionTransactions[0]?.transactionIdentifier;

    if (!transactionId) {
      throw new Error("결제 승인 거래 ID를 찾을 수 없습니다.");
    }

    return { 
      success: true, 
      message: "인앱결제가 승인되었습니다! 결제 검증을 실행합니다.",
      transactionId 
    };
  } catch (error: any) {
    console.error("RevenueCat Purchase failed:", error);
    return { success: false, message: error.message || "구글 인앱결제에 실패했습니다." };
  }
};

// 3. 통합 결제 브릿지 함수
export const requestPlatformPayment = async (req: PaymentRequest): Promise<PaymentResult> => {
  if (isNativeApp()) {
    return requestRevenueCatPayment(req);
  } else {
    return requestTossPayment(req);
  }
};

// 4. Supabase Edge Function을 통한 2차 결제 검증 및 스킨 영구 지급
export const verifyPaymentAndAwardSkin = async (params: {
  paymentType: "toss" | "revenuecat";
  skinId: string;
  userId: string;
  orderId?: string;
  paymentKey?: string;
  amount?: number;
  transactionId?: string;
}): Promise<{ success: boolean; message: string }> => {
  try {
    // Supabase Edge Function 호출
    const { data, error } = await supabase.functions.invoke("verify-payment", {
      body: params
    });

    if (error) throw error;
    if (!data?.success) {
      throw new Error(data?.message || "결제 무결성 검증에 실패했습니다.");
    }

    return { success: true, message: data.message || "스킨이 정상 지급되었습니다!" };
  } catch (error: any) {
    console.error("Payment verification failed:", error);
    return { success: false, message: error.message || "결제 확인 및 스킨 지급 처리 중 오류가 발생했습니다." };
  }
};
