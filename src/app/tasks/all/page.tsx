import { Task } from "@/lib/schemas/task";
import { tasks } from "./fake-data";
import { DataTable } from "@/components/data-table";
import { columns } from "./columns";

function getData(): Task[] {
    return tasks;
}

export default function AllTasksPage() {
    const data = getData();

    return (
        <div className="hidden h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <DataTable columns={columns} data={data} />
        </div>
    );
}
