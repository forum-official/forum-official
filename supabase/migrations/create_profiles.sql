-- profiles 테이블 생성 마이그레이션 SQL
-- 사용자 프로필 정보 및 취향(인생작가, 최애출판사, 인생 책)을 저장하는 핵심 테이블입니다.

-- 1. profiles 테이블 생성
CREATE TABLE IF NOT EXISTS public.profiles (
    id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    nickname text,
    bio text,
    profile_image text,
    is_private boolean DEFAULT false NOT NULL,
    fav_authors text[] DEFAULT '{}'::text[] NOT NULL,
    fav_publishers text[] DEFAULT '{}'::text[] NOT NULL,
    life_books jsonb DEFAULT '[]'::jsonb NOT NULL,
    push_enabled boolean DEFAULT true NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT profiles_pkey PRIMARY KEY (id)
);

-- RLS (Row Level Security) 설정 활성화
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 2. RLS 정책(Policy) 정의
-- 2-1. 모든 사용자가 프로필 정보를 조회(SELECT)할 수 있도록 허용
CREATE POLICY "Allow public read access to profiles" 
ON public.profiles 
FOR SELECT 
USING (true);

-- 2-2. 인증된 사용자가 자신의 프로필만 수정(UPDATE)할 수 있도록 허용
CREATE POLICY "Allow users to update their own profile" 
ON public.profiles 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 2-3. 인증된 사용자가 자신의 프로필 레코드를 생성(INSERT)할 수 있도록 허용
CREATE POLICY "Allow users to insert their own profile" 
ON public.profiles 
FOR INSERT 
WITH CHECK (auth.uid() = id);


-- 3. 회원가입(auth.users 등록) 시 profiles 테이블에 자동 레코드를 생성해주는 트리거 함수 정의
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (
        id, 
        nickname, 
        bio, 
        profile_image, 
        is_private, 
        fav_authors, 
        fav_publishers, 
        life_books, 
        push_enabled
    )
    VALUES (
        new.id,
        COALESCE(
            new.raw_user_meta_data->>'nickname', 
            '독서가_' || substring(new.id::text from 1 for 6)
        ),
        '',
        '',
        false,
        '{}'::text[],
        '{}'::text[],
        '[]'::jsonb,
        true
    );
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. auth.users 테이블에 신규 가입 발생 시 함수를 작동시키는 트리거 생성
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
