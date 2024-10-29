import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token) {
  try {
    const response = await fetch("http://103.20.96.14:8888/auth/refresh-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token.accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to refresh token");
    }
    const data = await response.json();
    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token,
      accessTokenExpiry: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    };
  } catch (error) {
    return null;
  }
}

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const credentialsObj = { ...credentials };

        console.log("Credentials:", credentialsObj);

        try {
          const data = JSON.stringify({
            email: credentialsObj.email,
            password: credentialsObj.password,
          })
          const res = await fetch("http://103.20.96.14:8888/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: data,
          });
          const text = await res.text();
          try {
            const user = JSON.parse(text);
            console.log("Parsed User:", user);

            if (res.ok && user) {
              return {
                id: Number(user.id),
                email: user.email,
                accessToken: user.access_token,
                refreshToken: user.refresh_token,
                role: user.role,
                accessTokenExpiry: Date.now() + 3 * 60 * 60 * 1000,
              };
            }
            return null;
          } catch (jsonError) {
            console.error("JSON Parse Error:", jsonError.message);
            return null;
          }
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          id: Number(user.id),
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          email: user.email,
          role: user.role,
          accessTokenExpiry: user.accessTokenExpiry,
        };
      }
      if (token.accessTokenExpiry && Date.now() < token.accessTokenExpiry) {
        return token;
      }
      return await refreshToken(token);
    },
    async session({ session, token }) {
      session.user = {
        ...session.user,
        id: token.id,
        accessToken: token.accessToken,
        refreshToken: token.refreshToken,
        email: token.email,
        role: token.role,
      };
      if (token.error) {
        session.error = token.error;
      }
      console.log(2)
      console.log(session);
      return session;
    },
  },
  events: {
    async signOut() {
      console.log("User signed out.");
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60,
  },
  secret: process.env.JWT_SECRET,
};

export default NextAuth(authOptions);
