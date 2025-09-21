"use client";

import { Plus } from "lucide-react";
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
import { useState } from "react";
import { toast } from "sonner";
import { IComputerStore } from "@/models/Computer";
import { CreateComputer } from "@/services/Computer";

export default function DialogCreateComputer({
  onCreated,
}: {
  onCreated: () => void;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState<IComputerStore>({
    name: "",
    secondname: "",
    processor: "",
    ram: 0,
    storage: 0,
    locality: "",
    description: "",
  });

  const resetForm = () => {
    setFormData({
      name: "",
      secondname: "",
      processor: "",
      ram: 0,
      storage: 0,
      locality: "",
      description: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name) return toast.error("Preencha o campo Nome");
    if (!formData.secondname)
      return toast.error("Preencha o campo Segundo Nome");
    if (!formData.processor) return toast.error("Preencha o campo Processador");
    if (!formData.ram) return toast.error("Preencha o campo de Memoria RAM");
    if (!formData.locality)
      return toast.error("Preencha o campo de Localidade");
    if (!formData.storage)
      return toast.error("Preencha o campo de Armazenamento");
    if (!formData.description)
      return toast.error("Preencha o campo de Descrição");

    try {
      await CreateComputer(formData);
      resetForm();
      setIsDialogOpen(false);
      toast.success("Computador criado com sucesso");
      onCreated();
    } catch (error) {
      console.error(error);
      toast.error("Erro ao criar computador");
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={resetForm}
          className="bg-green-700 hover:bg-green-800 text-white font-semibold font-montserrat px-6 py-3 text-lg shadow-lg cursor-pointer"
          size="lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Adicionar Computador
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto font-montserrat">
        <DialogHeader>
          <DialogTitle>Adicionar Computador</DialogTitle>
          <DialogDescription>
            Adicione um novo computador a lista.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nome *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Ex: COMPUTADOR TI"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="secondname">Segundo Nome *</Label>
              <Input
                id="secondname"
                value={formData.secondname}
                onChange={(e) =>
                  setFormData({ ...formData, secondname: e.target.value })
                }
                placeholder="Ex: DESKTOP-DDS22A1"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="processor">Processador *</Label>
            <Input
              id="processor"
              value={formData.processor}
              onChange={(e) =>
                setFormData({ ...formData, processor: e.target.value })
              }
              placeholder="Ex: Intel i5"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ram">Memória RAM (GB) *</Label>
              <Input
                id="ram"
                type="number"
                value={formData.ram}
                onChange={(e) =>
                  setFormData({ ...formData, ram: Number(e.target.value) })
                }
                placeholder="Ex: 8"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="storage">Armazenamento (GB) *</Label>
              <Input
                id="storage"
                type="number"
                value={formData.storage}
                onChange={(e) =>
                  setFormData({ ...formData, storage: Number(e.target.value) })
                }
                placeholder="Ex: 256"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="locality">Localidade *</Label>
            <Input
              id="locality"
              type="text"
              value={formData.locality}
              onChange={(e) =>
                setFormData({ ...formData, locality: e.target.value })
              }
              placeholder="Ex: Arcoverde"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descrição *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Descreva o computador"
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
              Criar Produto
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
