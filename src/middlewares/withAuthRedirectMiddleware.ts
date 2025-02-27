import nookies from "nookies";

const urls = ["/user/login", "/user/signup"];

const withAuthRedirectMiddleware = (handler: any) => {
  return async (ctx: any) => {
    const cookies = nookies.get(ctx);
    const token = cookies["accessToken"];

    if (token && urls.includes(ctx.req.url)) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return handler(ctx);
  };
};

export default withAuthRedirectMiddleware;
