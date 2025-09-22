"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IComputer } from "@/models/Computer";

interface ComputerDetailDialogProps {
  computer: IComputer | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ComputerDetailDialog({
  computer,
  isOpen,
  onOpenChange,
}: ComputerDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes do Computador</DialogTitle>
          <DialogDescription>
            Visualize todas as informações cadastradas do computador
          </DialogDescription>
        </DialogHeader>

        {computer && (
          <div className="space-y-6 py-4">
            {/* Informações Gerais */}
            <Section title="Informações Gerais">
              <div className="grid grid-cols-2 gap-4">
                <Info label="Nome" value={computer.name} />
                <Info label="Descrição" value={computer.description} />
                <Info label="Localidade" value={computer.locality} />
                <Info
                  label="Data de Criação"
                  value={formatDate(computer.updatedAt)}
                />
              </div>
            </Section>

            {/* Especificações Técnicas */}
            <Section title="Especificações Técnicas">
              <div className="grid grid-cols-2 gap-4">
                <Info label="Segundo Nome" value={computer.secondname} />
                <Info label="Processador" value={computer.processor} />
                <Info label="Memória RAM" value={computer.ram.toString()} />
                <Info
                  label="Armazenamento"
                  value={computer.storage.toString()}
                />
              </div>
            </Section>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

// Helpers
function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold text-gray-900">{title}</h3>
      {children}
    </div>
  );
}

function Info({ label, value }: { label: string; value?: string | null }) {
  return (
    <div className="flex flex-col">
      <span className="text-xs text-gray-500">{label}GB</span>
      <span className="font-medium text-gray-800">{value || "-"}GB</span>
    </div>
  );
}

function formatDate(date?: string | Date | null) {
  if (!date) return "-";
  return new Date(date).toLocaleString("pt-BR", {
    dateStyle: "short",
    timeStyle: "short",
  });
}
