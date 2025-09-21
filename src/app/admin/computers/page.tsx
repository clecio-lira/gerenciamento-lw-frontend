"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { FindAllComputers } from "@/services/Computer";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IComputer } from "@/models/Computer";
import DialogCreateComputer from "@/components/DialogCreateComputer";
import DialogDeleteComputer from "@/components/DialogDeleteComputer";
import DialogEditComputer from "@/components/DialogEditComputer";

export default function AdminProdutos() {
  const [computers, setComputers] = useState<IComputer[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // paginação
  const [page, setPage] = useState(1);
  const [limit] = useState(10); // tamanho fixo da página
  const [total, setTotal] = useState(0);

  const fetchComputers = async () => {
    try {
      const res = await FindAllComputers(
        page,
        limit,
        "createdAt,desc",
        searchTerm
      );
      setComputers(res.data);
      setTotal(res.total);
    } catch (error) {
      toast.error("Erro ao buscar produtos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComputers();
  }, [page, searchTerm]);

  const filteredComputers = computers.filter((computer) =>
    computer?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-gray-900">
            Computadores
          </h1>
          <p className="text-gray-600 font-josefin">
            Gerencie seus computadores
          </p>
        </div>

        <DialogCreateComputer onCreated={fetchComputers} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar computadores..."
            value={searchTerm}
            onChange={(e) => {
              setPage(1);
              setSearchTerm(e.target.value);
            }}
            className="pl-10"
          />
        </div>
        <div className="text-sm font-montserrat text-gray-600">
          {loading
            ? "Carregando..."
            : `${filteredComputers.length} de ${total} computadores`}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">
            Lista de Computadores
          </CardTitle>
          <CardDescription className="font-josefin">
            Gerencie todos os computadores da sua lista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto font-montserrat">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Segundo Nome</TableHead>
                  <TableHead>Localidade</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? // 🔹 Skeleton Rows
                    [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-16" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-4 w-20" />
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Skeleton className="h-8 w-8 rounded-md" />
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : filteredComputers.map((computer) => (
                      <TableRow key={computer.id}>
                        <TableCell>{computer.name}</TableCell>
                        <TableCell>{computer.secondname}</TableCell>
                        <TableCell>{computer.locality}</TableCell>
                        <TableCell>
                          {new Date(computer.updatedAt).toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <DialogEditComputer
                            id={computer.id}
                            onCreated={fetchComputers}
                          />
                          <DialogDeleteComputer
                            id={computer.id}
                            name={computer.name}
                            setComputers={setComputers}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-center gap-2 font-montserrat mt-4">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1 || loading}
              className="cursor-pointer"
            >
              Anterior
            </Button>

            <span className="px-2 text-sm flex items-center">
              Página {page} de {Math.ceil(total / limit)}
            </span>

            <Button
              variant="outline"
              onClick={() =>
                setPage((p) => (p < Math.ceil(total / limit) ? p + 1 : p))
              }
              disabled={page >= Math.ceil(total / limit) || loading}
              className="cursor-pointer"
            >
              Próxima
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
