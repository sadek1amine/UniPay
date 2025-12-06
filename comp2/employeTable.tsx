import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const EmployeesTable = () => {
  return (
    <Table>
      <TableHeader className="bg-[#f9fafb]">
        <TableRow>
          <TableHead className="px-2">Nom</TableHead>
          <TableHead className="px-2">Poste</TableHead>
          <TableHead className="px-2">Agence</TableHead>
          <TableHead className="px-2">Email</TableHead>
          <TableHead className="px-2 max-md:hidden">Téléphone</TableHead>
          <TableHead className="px-2 max-md:hidden">Statut</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {/* Employee 1 */}
        <TableRow className="bg-[#F6FEF9] !border-b-DEFAULT">
          <TableCell className="pl-2 pr-10">Karim Bensalah</TableCell>
          <TableCell className="pl-2 pr-10">Caissier</TableCell>
          <TableCell className="pl-2 pr-10">Agence Alger Centre</TableCell>
          <TableCell className="pl-2 pr-10">karim.b@banque.dz</TableCell>
          <TableCell className="pl-2 pr-10 max-md:hidden">0554 23 98 76</TableCell>
          <TableCell className="pl-2 pr-10 max-md:hidden">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Actif
            </span>
          </TableCell>
        </TableRow>

        {/* Employee 2 */}
        <TableRow className="bg-[#FFFBFA] !border-b-DEFAULT">
          <TableCell className="pl-2 pr-10">Leila Amrani</TableCell>
          <TableCell className="pl-2 pr-10">Conseillère Clientèle</TableCell>
          <TableCell className="pl-2 pr-10">Agence Oran</TableCell>
          <TableCell className="pl-2 pr-10">leila.a@banque.dz</TableCell>
          <TableCell className="pl-2 pr-10 max-md:hidden">0661 54 12 34</TableCell>
          <TableCell className="pl-2 pr-10 max-md:hidden">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
              Suspendu
            </span>
          </TableCell>
        </TableRow>

        {/* Employee 3 */}
        <TableRow className="bg-[#F6FEF9] !border-b-DEFAULT">
          <TableCell className="pl-2 pr-10">Yacine Haddad</TableCell>
          <TableCell className="pl-2 pr-10">Agent Crédit</TableCell>
          <TableCell className="pl-2 pr-10">Agence Constantine</TableCell>
          <TableCell className="pl-2 pr-10">yacine.h@banque.dz</TableCell>
          <TableCell className="pl-2 pr-10 max-md:hidden">0770 88 99 00</TableCell>
          <TableCell className="pl-2 pr-10 max-md:hidden">
            <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
              Actif
            </span>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}

export default EmployeesTable;
