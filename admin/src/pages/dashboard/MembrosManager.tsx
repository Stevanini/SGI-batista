import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { Trash, Users } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "@/styles/aggrid-custom.css";
import {
  ClientSideRowModelModule,
  ModuleRegistry,
  ValidationModule,
  LocaleModule,
  PaginationModule,
  ColDef,
} from "ag-grid-community";
import InputMask from "react-input-mask";

ModuleRegistry.registerModules([
  ClientSideRowModelModule,
  ValidationModule,
  LocaleModule,
  PaginationModule,
]);

interface Membro {
  id: string;
  nome: string;
  data_nascimento?: string;
  email?: string;
  telefone?: string;
  endereco?: string;
  data_entrada?: string;
  funcao?: string;
  observacao?: string;
  created_at: string;
  deleted_at?: string;
}

const funcoes = ["Membro", "Diácono", "Presbítero", "Pastor", "Líder", "Outro"];

export default function MembrosManager() {
  const [membros, setMembros] = useState<Membro[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Partial<Membro>>({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchMembros();
  }, []);

  const fetchMembros = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("membros")
      .select("*")
      .is("deleted_at", null)
      .order("nome", { ascending: true });
    if (error) {
      toast({
        title: "Erro ao carregar membros",
        description: error.message,
        variant: "destructive",
      });
      setLoading(false);
      return;
    }
    setMembros(data || []);
    setLoading(false);
  };

  const handleChange = (field: keyof Membro, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    if (loading) return;
    setLoading(true);
    try {
      if (!form.nome) {
        toast({ title: "Preencha o nome do membro", variant: "destructive" });
        setLoading(false);
        return;
      }
      const novoMembro = {
        ...form,
        created_at: new Date().toISOString(),
      };
      const { error } = await supabase.from("membros").insert(novoMembro);
      if (error) {
        toast({
          title: "Erro ao salvar membro",
          description: error.message,
          variant: "destructive",
        });
        setLoading(false);
        return;
      }
      toast({ title: "Membro adicionado!" });
      setShowForm(false);
      setForm({});
      fetchMembros();
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (id: string) => {
    const { error } = await supabase
      .from("membros")
      .update({ deleted_at: new Date().toISOString() })
      .eq("id", id);
    if (error) {
      toast({
        title: "Erro ao excluir membro",
        description: error.message,
        variant: "destructive",
      });
      return;
    }
    toast({ title: "Membro excluído!" });
    fetchMembros();
  };

  const membrosFiltrados = membros.filter(
    (m) =>
      !search ||
      m.nome?.toLowerCase().includes(search.toLowerCase()) ||
      m.email?.toLowerCase().includes(search.toLowerCase()) ||
      m.telefone?.toLowerCase().includes(search.toLowerCase()) ||
      m.funcao?.toLowerCase().includes(search.toLowerCase())
  );

  const columns: ColDef[] = [
    { headerName: "Nome", field: "nome" },
    {
      headerName: "Data Nasc.",
      field: "data_nascimento",
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleDateString() : "-",
    },
    { headerName: "E-mail", field: "email" },
    { headerName: "Telefone", field: "telefone" },
    { headerName: "Endereço", field: "endereco" },
    {
      headerName: "Data Entrada",
      field: "data_entrada",
      valueFormatter: (p) =>
        p.value ? new Date(p.value).toLocaleDateString() : "-",
    },
    { headerName: "Função", field: "funcao" },
    {
      headerName: "Observação",
      field: "observacao",
      cellRenderer: (p) => p.value || "-",
    },
    {
      headerName: "Ações",
      field: "id",
      width: 90,
      cellRenderer: (p) => (
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleSoftDelete(p.value)}
          title="Excluir membro"
        >
          <Trash className="w-4 h-4 text-red-500" />
        </Button>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Users className="w-7 h-7" /> Cadastro de Membros
        </h1>
        <Button
          onClick={() => {
            setShowForm(true);
            setForm({});
          }}
        >
          Novo Membro
        </Button>
      </div>
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <Input
          type="text"
          placeholder="Pesquisar por nome, e-mail, telefone ou função"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-lg"
        />
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-left">Membros</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div
            className="ag-theme-alpine"
            style={{ width: "100%", height: 400 }}
          >
            <AgGridReact
              rowData={membrosFiltrados}
              columnDefs={columns}
              pagination={true}
              paginationPageSize={20}
              localeText={{
                noRowsToShow: "Nenhum membro encontrado.",
              }}
            />
          </div>
        </CardContent>
      </Card>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl p-8 shadow-lg w-full max-w-md flex flex-col gap-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-2">Novo Membro</h2>
            <Label>Nome</Label>
            <Input
              value={form.nome || ""}
              onChange={(e) => handleChange("nome", e.target.value)}
              required
            />
            <Label>Data de Nascimento</Label>
            <Input
              type="date"
              value={form.data_nascimento || ""}
              onChange={(e) => handleChange("data_nascimento", e.target.value)}
            />
            <Label>E-mail</Label>
            <Input
              value={form.email || ""}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Label>Telefone</Label>
            <InputMask
              mask="(99) 99999-9999"
              value={form.telefone || ""}
              onChange={(e) => handleChange("telefone", e.target.value)}
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  type="text"
                  placeholder="(00) 00000-0000"
                />
              )}
            </InputMask>
            <Label>Endereço Completo</Label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
              value={form.endereco || ""}
              onChange={(e) => handleChange("endereco", e.target.value)}
              placeholder="Ex: Rua Exemplo, 123 - Bairro - Cidade - UF - CEP"
            />
            <Label>Data de Entrada</Label>
            <Input
              type="date"
              value={form.data_entrada || ""}
              onChange={(e) => handleChange("data_entrada", e.target.value)}
            />
            <Label>Função</Label>
            <select
              value={form.funcao || ""}
              onChange={(e) => handleChange("funcao", e.target.value)}
              className="border rounded p-2"
            >
              <option value="">Selecione</option>
              {funcoes.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <Label>Observação</Label>
            <Input
              value={form.observacao || ""}
              onChange={(e) => handleChange("observacao", e.target.value)}
            />
            <div className="flex gap-2 mt-4">
              <Button variant="outline" onClick={() => setShowForm(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSubmit} disabled={loading}>
                Salvar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
