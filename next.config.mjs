/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler:{
        styledComponents:true,
    },
    //reactStrictMode : false  // 개발모드( 리액트 두번실행되는것을 방지할때 )

    eslint:{
        ignoreDuringBuilds:true,
    }
};



export default nextConfig;
