"use client";

import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ICleanStore } from "@/models/Clean";
import { FindOneClean, UpdateClean } from "@/services/Clean";

interface DialogEditCleanProps {
  id: number;
  onCreated: () => void;
}

export default function DialogEditClean({
  id,
  onCreated,
}: DialogEditCleanProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<ICleanStore>({
    name: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
    });
  };

  useEffect(() => {
    if (!isDialogOpen) return;
    const fetchClean = async () => {
      try {
        const res = await FindOneClean(id);
        setFormData({
          name: res.name || "",
          description: res.description || "",
        });
      } catch (error) {
        toast.error("Erro ao buscar a limpeza");
      }
    };
    fetchClean();
  }, [id, isDialogOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) return toast.error("Preencha o campo Nome");
    if (!formData.description)
      return toast.error("Preencha o campo de Descrição");

    try {
      await UpdateClean(id, formData);
      resetForm();
      setIsDialogOpen(false);
      toast.success("Limpeza atualizada com sucesso");
      onCreated();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao atualizar a limpeza");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="cursor-pointer">
          <Edit className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto font-montserrat">
        <DialogHeader>
          <DialogTitle>Editar Limpeza</DialogTitle>
          <DialogDescription>Edite a limpeza.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name || ""}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ex: LW ELETRO"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descreva as ações da limpeza"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="cursor-pointer"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="cursor-pointer bg-green-700 hover:bg-green-800 text-white"
            >
              Editar Limpeza
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
