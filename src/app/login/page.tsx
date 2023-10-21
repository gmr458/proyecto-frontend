"use client";

import LoginForm from "@/components/login-form";

export default function LoginPage() {
    return (
        <div className="min-h-min flex items-center justify-center">
            <LoginForm />
        </div>
    );
}

// export default function LoginPage() {
//     const router = useRouter();

//     const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
//         event.preventDefault();

//         const formData = new FormData(event.currentTarget);

//         const response = await signIn("credentials", {
//             email: formData.get("email"),
//             password: formData.get("password"),
//             redirect: false,
//         });

//         if (response?.error) {
//             console.log({ response });
//         }

//         if (response?.ok) {
//             return router.push("/profile");
//         }
//     };

//     return (
//         <div>
//             <form onSubmit={handleSubmit}>
//                 <input type="email" name="email" placeholder="email" />
//                 <input type="password" name="password" placeholder="password" />
//                 <button type="submit">SignIn</button>
//             </form>
//         </div>
//     );
// }
