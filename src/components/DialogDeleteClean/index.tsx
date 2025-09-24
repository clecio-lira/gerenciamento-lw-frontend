import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { RemoveClean } from "@/services/Clean";

interface DialogDeleteCleanProps {
  id: number;
  name: string;
  setCleaning: (prev: any) => void;
}

export default function DialogDeleteClean({
  id,
  name,
  setCleaning,
}: DialogDeleteCleanProps) {
  const handleDelete = async (id: number) => {
    try {
      await RemoveClean(id);
      setCleaning((prev: any) => prev.filter((p: any) => p.id !== id));

      toast.success("Limpeza excluída com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir limpeza");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="ml-2 cursor-pointer">
          <Trash2 className="h-4 w-4 mr-2" />
          Excluir
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="font-montserrat">
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir Limpeza</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir a limpeza <strong>{name}</strong>?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="cursor-pointer">
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="cursor-pointer"
            onClick={() => handleDelete(id)}
          >
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
