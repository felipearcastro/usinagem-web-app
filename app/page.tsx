"use client";
import { useState, useEffect } from "react";
import { Input } from "../components/ui/input";
import { Card, CardContent } from "../components/ui/card";

const materiais = ["Aço 1020", "Aço 1045", "Inox 304", "Inox 316", "Alumínio 6351", "Alumínio 7075", "Latão", "Bronze", "Ferro Fundido", "Nylon", "PVC", "Acrílico", "Cobre", "PEAD", "Poliacetal", "Titânio"];
const ferramentas = ["Broca HSS", "Broca Carbide", "Fresa HSS", "Fresa Carbide", "Macho Manual", "Macho Máquina", "Rebolo", "Serra Circular", "Serra Fita"];
const operacoes = ["Furação", "Rosqueamento", "Corte", "Fresamento", "Retífica", "Faceamento", "Alargamento", "Rebaixo", "Chanframento"];

const velocidadeCorte = {
  "Aço 1020": { "Broca HSS": 25, "Broca Carbide": 60, "Fresa HSS": 30, "Fresa Carbide": 90 },
  "Alumínio 6351": { "Broca HSS": 80, "Broca Carbide": 150, "Fresa HSS": 100, "Fresa Carbide": 250 },
  "Inox 304": { "Broca HSS": 15, "Broca Carbide": 35, "Fresa HSS": 20, "Fresa Carbide": 50 },
  "Aço 1045": { "Broca HSS": 20, "Broca Carbide": 50 },
  "Bronze": { "Broca HSS": 50, "Broca Carbide": 100 },
  "Latão": { "Broca HSS": 90, "Broca Carbide": 180 },
  "Ferro Fundido": { "Broca HSS": 20, "Broca Carbide": 40 },
  "Cobre": { "Broca HSS": 70, "Broca Carbide": 120 },
  "PEAD": { "Broca HSS": 200, "Broca Carbide": 250 },
  "Poliacetal": { "Broca HSS": 180, "Broca Carbide": 230 },
  "Titânio": { "Broca HSS": 10, "Broca Carbide": 25 }
};

const avancosRecomendados = {
  "Broca HSS": 0.2,
  "Broca Carbide": 0.3,
  "Fresa HSS": 0.15,
  "Fresa Carbide": 0.25
};

const dicas = {
  "Aço 1020": "Use fluido de corte e mantenha pressão constante.",
  "Alumínio 6351": "Evite cavacos grudados, use ar comprimido ou óleo leve.",
  "Inox 304": "Evite paradas durante o corte e lubrifique abundantemente.",
  "Latão": "Corte fácil, atenção ao avanço para evitar vibração.",
  "Ferro Fundido": "Use corte seco ou leve lubrificação.",
  "Cobre": "Alta ductilidade, cuidado com cavacos longos.",
  "Titânio": "Baixa condutividade térmica, use ferramentas especializadas."
};

export default function UsinagemApp() {
  const [material, setMaterial] = useState("");
  const [ferramenta, setFerramenta] = useState("");
  const [operacao, setOperacao] = useState("");
  const [diametro, setDiametro] = useState("");
  const [profundidade, setProfundidade] = useState("");
  const [rpm, setRpm] = useState("");
  const [avanco, setAvanco] = useState("");
  const [dica, setDica] = useState("");

  useEffect(() => {
    const d = parseFloat(diametro);
    if (material && ferramenta && !isNaN(d)) {
      const vc = velocidadeCorte[material]?.[ferramenta];
      const f = avancosRecomendados[ferramenta];
      if (vc && f) {
        const rpmCalculado = Math.round((1000 * vc) / (Math.PI * d));
        setRpm(rpmCalculado.toString());
        setAvanco(f.toString());
        setDica(dicas[material] || "");
      }
    }
  }, [material, ferramenta, diametro]);

  const calcularTempo = () => {
    const d = parseFloat(profundidade);
    const a = parseFloat(avanco);
    const r = parseFloat(rpm);
    if (d > 0 && a > 0 && r > 0) {
      return (d / (a * r)).toFixed(2);
    }
    return "-";
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-100 to-blue-200 py-10 px-4">
      <Card className="w-full max-w-lg rounded-2xl shadow-2xl p-0 bg-white/90">
        <CardContent className="p-8">
          <h1 className="text-2xl font-bold mb-2 text-blue-900 tracking-tight">
            Cálculo de Tempo de Usinagem
          </h1>
          <p className="text-gray-500 mb-6 text-sm">Simule e obtenha parâmetros ideais para cada tipo de usinagem!</p>

          <form className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Material</label>
              <select
                value={material}
                onChange={e => setMaterial(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="">Selecione o Material</option>
                {materiais.map((mat) => (
                  <option key={mat} value={mat}>{mat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Ferramenta</label>
              <select
                value={ferramenta}
                onChange={e => setFerramenta(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="">Selecione a Ferramenta</option>
                {ferramentas.map((fer) => (
                  <option key={fer} value={fer}>{fer}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Operação</label>
              <select
                value={operacao}
                onChange={e => setOperacao(e.target.value)}
                className="w-full border border-blue-200 rounded-lg p-2 bg-white focus:ring-2 focus:ring-blue-300 transition"
              >
                <option value="">Selecione a Operação</option>
                {operacoes.map((op) => (
                  <option key={op} value={op}>{op}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 font-medium text-gray-700">Diâmetro (mm)</label>
                <Input
                  type="number"
                  placeholder="Ex: 20"
                  value={diametro}
                  onChange={(e) => setDiametro(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Profundidade/Corte (mm)</label>
                <Input
                  type="number"
                  placeholder="Ex: 30"
                  value={profundidade}
                  onChange={(e) => setProfundidade(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">Avanço (mm/rot)</label>
                <Input
                  type="number"
                  placeholder="Ex: 0.3"
                  value={avanco}
                  onChange={(e) => setAvanco(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium text-gray-700">RPM</label>
                <Input
                  type="number"
                  placeholder="Ex: 1800"
                  value={rpm}
                  onChange={(e) => setRpm(e.target.value)}
                  className="w-full border border-blue-200 rounded-lg p-2"
                />
              </div>
            </div>

            <div className="mt-6">
              <div className="bg-blue-50 p-4 rounded-xl shadow-inner text-lg font-semibold text-blue-900 flex items-center gap-2 justify-between">
                <span>Tempo Estimado:</span>
                <span className="text-2xl font-bold">{calcularTempo()} min</span>
              </div>
              {dica && (
                <div className="text-blue-700 mt-3 bg-blue-100/80 p-3 rounded-lg text-sm flex items-center gap-2">
                  <span className="text-xl">💡</span>
                  <span>{dica}</span>
                </div>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
