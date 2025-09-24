"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IClean } from "@/models/Clean";

interface CleanDetailDialogProps {
  clean: IClean | null;
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CleanDetailDialog({
  clean,
  isOpen,
  onOpenChange,
}: CleanDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Detalhes da limpeza</DialogTitle>
          <DialogDescription>
            Visualize todas as informações cadastradas na limpeza
          </DialogDescription>
        </DialogHeader>

        {clean && (
          <div className="space-y-6 py-4">
            {/* Informações Gerais */}
            <Section title="Informações Gerais">
              <div className="grid grid-cols-2 gap-4">
                <Info label="Nome" value={clean.name} />
                <Info label="Descrição" value={clean.description} />
                <Info
                  label="Data de Criação"
                  value={formatDate(clean.updatedAt)}
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
      <span className="text-xs text-gray-500">{label}</span>
      <span className="font-medium text-gray-800">{value || "-"}</span>
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
