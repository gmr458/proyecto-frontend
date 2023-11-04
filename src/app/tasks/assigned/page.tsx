import { auth } from "@/lib/auth";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { apiGetMyAssignedTasks } from "@/lib/fetch/tasks";

export default async function AssignedTasksPage() {
    const session = await auth();

    const {
        data: { tasks },
    } = await apiGetMyAssignedTasks(session?.user.token);

    return (
        <div className="hidden h-full flex-1 flex-col py-1 px-4 md:flex">
            <DataTable columns={columns} data={tasks} pageSize={7} />
        </div>
    );
}
