"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Trash, Wallet } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "@/styles/aggrid-custom.css";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  LocaleModule,
  PaginationModule,
} from "ag-grid-community";

interface Lancamento {
  id: string;
  data: string;
  descricao: string;
  valor: number;
  tipo: "entrada" | "saida";
  categoria: string;
  observacao?: string;
  user_id: string;
  created_at: string;
}

interface UserProfile {
  id: string;
  email: string;
}

const categorias = [
  "Dízimo",
  "Oferta",
  "Bazar",
  "Evento",
  "Manutenção",
  "Outros",
];

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  LocaleModule,
  PaginationModule,
]);

export default function CaixaManager() {
  const [lancamentos, setLancamentos] = useState<Lancamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Lancamento>>({
    tipo: "entrada",
    data: "",
    valor: 0,
  });
  const [filter, setFilter] = useState({
    tipo: "",
    categoria: "",
    periodo: "",
  });
  const [saldo, setSaldo] = useState(0);
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([]);

  useEffect(() => {
    fetchLancamentos();
    fetchUserProfiles();
  }, []);

  const fetchLancamentos = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("caixa_lancamentos")
      .select("*")
      .is("deleted_at", null)
      .order("data", { ascending: false });
    if (error) {
      toast({
        title: "Erro ao carregar lançamentos",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    setLancamentos(data || []);
    calcularSaldo(data || []);
    setLoading(false);
  };

  const fetchUserProfiles = async () => {
    const { data } = await supabase.from("user_profiles").select("id, email");
    setUserProfiles(data || []);
  };

  const calcularSaldo = (lancs: Lancamento[]) => {
    const saldoAtual = lancs.reduce(
      (acc, l) => acc + (l.tipo === "entrada" ? l.valor : -l.valor),
      0
    );
    setSaldo(saldoAtual);
  };

  const handleChange = (field: keyof Lancamento, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (
      !form.data ||
      !form.descricao ||
      !form.valor ||
      !form.tipo ||
      !form.categoria
    ) {
      toast({
        title: "Preencha todos os campos obrigatórios",
        variant: "destructive",
      });
      return;
    }
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const novoLanc = {
      ...form,
      valor: Number(form.valor),
      user_id: user?.id || "",
      created_at: new Date().toISOString(),
    };
    const { error } = await supabase.from("caixa_lancamentos").insert(novoLanc);
    if (error) {
      toast({
        title: "Erro ao salvar lançamento",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Lançamento adicionado!" });
    setShowForm(false);
    setForm({ tipo: "entrada", data: "", valor: 0 });
    fetchLancamentos();
  };

  const handleSoftDelete = async (id: string) => {
    const { error } = await supabase
      .from("caixa_lancamentos")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast({
        title: "Erro ao excluir lançamento",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Lançamento excluído!" });
    fetchLancamentos();
  };

  // Filtros simples (pode ser expandido)
  const lancamentosFiltrados = lancamentos.filter(
    (l) =>
      (!filter.tipo || l.tipo === filter.tipo) &&
      (!filter.categoria || l.categoria === filter.categoria)
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: any[] = [
    {
      headerName: "Data",
      field: "data",
      valueFormatter: (p) => new Date(p.value).toLocaleDateString(),
    },
    { headerName: "Descrição", field: "descricao" },
    { headerName: "Tipo", field: "tipo" },
    { headerName: "Categoria", field: "categoria" },
    {
      headerName: "Valor",
      field: "valor",
      cellRenderer: (p) =>
        p.data.tipo === "entrada" ? (
          <span className="text-green-700">
            + R${" "}
            {Number(p.value).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        ) : (
          <span className="text-red-700">
            - R${" "}
            {Number(p.value).toLocaleString("pt-BR", {
              minimumFractionDigits: 2,
            })}
          </span>
        ),
    },
    { headerName: "Usuário", field: "user_email" },
    {
      headerName: "Ações",
      field: "id",
      width: 90,
      cellRenderer: (p) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSoftDelete(p.value)}
          title="Excluir lançamento"
        >
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      ),
    },
  ];

  // Monte os dados para a grid, incluindo o email do usuário
  const lancamentosGrid = lancamentosFiltrados.map((l) => {
    const user = userProfiles.find((u) => u.id === l.user_id);
    return {
      ...l,
      user_email: user?.email || l.user_id,
    };
  });
 

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Controle de Caixa</h1>
        <Button onClick={() => setShowForm(true)}>Novo Lançamento</Button>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Saldo Atual</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-700">
            R$ {saldo.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>
      <div className="flex gap-4 mb-4">
        <select
          className="border rounded p-2"
          value={filter.tipo}
          onChange={(e) => setFilter((f) => ({ ...f, tipo: e.target.value }))}
        >
          <option value="">Todos os tipos</option>
          <option value="entrada">Entradas</option>
          <option value="saida">Saídas</option>
        </select>
        <select
          className="border rounded p-2"
          value={filter.categoria}
          onChange={(e) =>
            setFilter((f) => ({ ...f, categoria: e.target.value }))
          }
        >
          <option value="">Todas categorias</option>
          {categorias.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Lançamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="ag-theme-alpine" style={{ width: "100%", height: 400 }}>
            <AgGridReact
              rowData={lancamentosGrid}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={20}
              localeText={{
                noRowsToShow: "Nenhum lançamento encontrado.",
              }}
            />
          </div>
        </CardContent>
      </Card>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md flex flex-col gap-4">
            <h2 className="text-xl font-bold mb-2">Novo Lançamento</h2>
            <Label>Data</Label>
            <Input
              type="date"
              value={form.data}
              onChange={(e) => handleChange("data", e.target.value)}
            />
            <Label>Descrição</Label>
            <Input
              value={form.descricao || ""}
              onChange={(e) => handleChange("descricao", e.target.value)}
            />
            <Label>Tipo</Label>
            <select
              value={form.tipo}
              onChange={(e) =>
                handleChange("tipo", e.target.value as "entrada" | "saida")
              }
              className="border rounded p-2"
            >
              <option value="entrada">Entrada</option>
              <option value="saida">Saída</option>
            </select>
            <Label>Categoria</Label>
            <select
              value={form.categoria}
              onChange={(e) => handleChange("categoria", e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Selecione</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <Label>Valor</Label>
            <Input
              type="number"
              value={form.valor || ""}
              onChange={(e) => handleChange("valor", e.target.value)}
            />
            <Label>Observação</Label>
            <Input
              value={form.observacao || ""}
              onChange={(e) => handleChange("observacao", e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit}>Salvar</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
