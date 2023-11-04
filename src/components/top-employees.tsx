import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ResUserTop } from "@/lib/schemas/user";

type PropsTopEmployees = {
    users: ResUserTop[];
};

export function TopEmployees({ users }: PropsTopEmployees) {
    return (
        <div className="space-y-8">
            {users.map((user) => (
                <div className="flex items-center" key={user.id}>
                    <Avatar className="h-9 w-9">
                        <AvatarImage alt="Avatar" />
                        <AvatarFallback>
                            {user.nombre.at(0)}
                            {user.apellido.at(0)}
                        </AvatarFallback>
                    </Avatar>
                    <div className="ml-4 space-y-1">
                        <p className="text-sm font-medium leading-none">
                            {user.nombre} {user.apellido}
                        </p>
                        <p className="text-sm text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="ml-auto font-medium">{user.tareas_ejecutadas}</div>
                </div>
            ))}
        </div>
    );
}
