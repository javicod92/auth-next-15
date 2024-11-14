import { dateTransform } from "@/utils/dateTransform";

async function getData() {
  const res = await fetch("http://localhost:3000/api/users");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Home() {
  const { users } = await getData();

  return (
    <div>
      <table className="text-left border m-[1rem] text-sm font-light">
        <thead className="border-b bg-white font-medium dark:border-neutral-500 dark:bg-neutral-400">
          <tr className="border-b text-center">
            <th
              className="px-6 py-4 bg-teal-700 text-white font-semibold text-lg"
              scope="col"
              colSpan={4}
            >
              Tabla de Usuarios
            </th>
          </tr>

          <tr>
            <th className="px-6 py-4" scope="col">
              #
            </th>
            <th className="px-6 py-4" scope="col">
              Id
            </th>
            <th className="px-6 py-4" scope="col">
              Email
            </th>
            <th className="px-6 py-4" scope="col">
              Creado
            </th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any, index: number) => {
            const isEven = index % 2 === 0;
            const bg = isEven
              ? "bg-white dark:bg-neutral-200"
              : "bg-neutral-100 dark:bg-neutral-400";

            return (
              <tr
                key={user._id}
                className={`${bg} border-b font-medium dark:border-neutral-500`}
              >
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {index + 1}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {user._id}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4 font-medium">
                  {dateTransform(user.createdAt)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
