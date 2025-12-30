import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"

function App() {
  const [person, setPerson] = useState<any>(null)

  const handleGenerate = async () => {
    // Aqui conectaremos com o Java depois
    console.log("Gerando pessoa...") 
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-slate-950 text-white">
      <Card className="w-[350px] bg-slate-900 border-slate-800 text-white">
        <CardHeader>
          <CardTitle>Gerador de Pessoas</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="space-y-2">
            <p className="text-sm text-slate-400">Nome Completo</p>
            <p className="font-mono text-lg">{person?.fullName || "..."}</p>
          </div>
          
          <div className="space-y-2">
             <p className="text-sm text-slate-400">CPF</p>
             <p className="font-mono text-lg">{person?.cpf || "000.000.000-00"}</p>
          </div>

          <Button onClick={handleGenerate} className="w-full bg-blue-600 hover:bg-blue-700">
            Gerar Identidade
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

export default App