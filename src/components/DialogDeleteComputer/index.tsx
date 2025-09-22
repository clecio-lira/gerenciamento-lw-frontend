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
import { RemoveComputer } from "@/services/Computer";
import { toast } from "sonner";

interface DialogDeleteComputerProps {
  id: number;
  name: string;
  setComputers: (prev: any) => void;
}

export default function DialogDeleteComputer({
  id,
  name,
  setComputers,
}: DialogDeleteComputerProps) {
  const handleDelete = async (id: number) => {
    try {
      await RemoveComputer(id);
      setComputers((prev: any) => prev.filter((p: any) => p.id !== id));

      toast.success("Computador excluído com sucesso!");
    } catch (error) {
      console.error(error);
      toast.error("Erro ao excluir computador");
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
          <AlertDialogTitle>Excluir Computador</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza de que deseja excluir o computador{" "}
            <strong>{name}</strong>?
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
