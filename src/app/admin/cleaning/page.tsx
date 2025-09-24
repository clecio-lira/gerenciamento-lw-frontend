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
import { Search, Eye } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { IClean } from "@/models/Clean";
import { FindAllCleaning } from "@/services/Clean";
import { CleanDetailDialog } from "@/components/CleanDetailDialog";
import DialogCreateClean from "@/components/DialogCreateClean";
import DialogDeleteClean from "@/components/DialogDeleteClean";
import DialogEditClean from "@/components/DialogEditClean";

export default function Cleaning() {
  const [cleaning, setCleaning] = useState<IClean[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // paginação
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // controle do modal de detalhes
  const [selectedCleaning, setSelectedCleaning] = useState<IClean | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const fetchCleaning = async () => {
    try {
      const res = await FindAllCleaning(
        page,
        limit,
        "updatedAt,desc",
        searchTerm
      );
      setCleaning(res.data);
      setTotal(res.total);
    } catch (error) {
      toast.error("Erro ao buscar limpezas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCleaning();
  }, [page, searchTerm]);

  const filteredCleaning = cleaning.filter((clean) =>
    clean?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold font-montserrat text-gray-900">
            Limpezas
          </h1>
          <p className="text-gray-600 font-josefin">Gerencie suas limpezas</p>
        </div>

        <DialogCreateClean onCreated={fetchCleaning} />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Buscar limpezas..."
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
            : `${filteredCleaning.length} de ${total} limpezas`}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-montserrat">Lista de limpezas</CardTitle>
          <CardDescription className="font-josefin">
            Gerencie todas as limpezas da sua lista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto font-montserrat">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading
                  ? [...Array(5)].map((_, i) => (
                      <TableRow key={i}>
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
                            <Skeleton className="h-8 w-8 rounded-md" />
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  : filteredCleaning.map((clean) => (
                      <TableRow key={clean.id}>
                        <TableCell>{clean.name}</TableCell>
                        <TableCell>
                          {new Date(clean.updatedAt).toLocaleString("pt-BR")}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => {
                                setSelectedCleaning(clean);
                                setIsDetailOpen(true);
                              }}
                              className="cursor-pointer"
                            >
                              <Eye className="h-4 w-4" />
                            </Button>

                            <DialogEditClean
                              id={clean.id}
                              onCreated={fetchCleaning}
                            />

                            <DialogDeleteClean
                              id={clean.id}
                              name={clean.name}
                              setCleaning={setCleaning}
                            />
                          </div>
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

      <CleanDetailDialog
        clean={selectedCleaning}
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
      />
    </div>
  );
}
