// Ajouter cette ligne en tout premier
"use client";

// Puis laissez le reste du code tel quel

import React, { useState } from 'react'
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent 
} from '@/components/ui/card'
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Search } from "lucide-react"

interface Technique {
  id: number
  name: string
  position: string
  category: string
  difficulty: 'blanc' | 'bleu' | 'violet' | 'marron' | 'noir'
  image: string
  keyPoints: string[]
  description: string
  transitions: string[]
}

const TechniquesGrid = () => {
  const [selectedTechnique, setSelectedTechnique] = useState<Technique | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [filterPosition, setFilterPosition] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      'blanc': 'bg-white text-black border border-gray-200',
      'bleu': 'bg-blue-500 text-white',
      'violet': 'bg-purple-500 text-white',
      'marron': 'bg-amber-800 text-white',
      'noir': 'bg-black text-white'
    }
    return colors[difficulty as keyof typeof colors] || 'bg-gray-500 text-white'
  }

  const techniques = [
    {
      id: 1,
      name: "Triangle",
      position: "Garde fermée",
      category: "Soumission",
      difficulty: "bleu",
      image: "/api/placeholder/300/200",
      keyPoints: [
        "Angle à 45 degrés",
        "Contrôle du bras opposé",
        "Jambes verrouillées"
      ],
      description: "Étranglement en forme de triangle avec les jambes...",
      transitions: ["Omoplata", "Armbar"]
    },
    {
      id: 2,
      name: "Omoplata",
      position: "Garde fermée",
      category: "Soumission",
      difficulty: "violet",
      image: "/api/placeholder/300/200",
      keyPoints: [
        "Contrôle du bras",
        "Rotation sous l'adversaire",
        "Pression sur l'épaule"
      ],
      description: "Clé d'épaule avec la jambe...",
      transitions: ["Triangle", "Sweep"]
    },
    {
      id: 3,
      name: "Kimura",
      position: "Side Control",
      category: "Soumission",
      difficulty: "blanc",
      image: "/api/placeholder/300/200",
      keyPoints: [
        "Grip figure-4",
        "Coude proche du corps",
        "Rotation externe"
      ],
      description: "Clé d'épaule en rotation externe...",
      transitions: ["Armbar", "Back Take"]
    }
  ] as Technique[]
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 relative">
      {/* Grain overlay */}
      <div 
        className="fixed inset-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noiseFilter)"/%3E%3C/svg%3E")',
          backgroundRepeat: 'repeat',
        }}
      />

      <div className="container mx-auto px-4 py-8 relative">
        {/* En-tête */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
            Liste des techniques
          </h1>
          <div className="max-w-2xl space-y-2 text-gray-600">
            <p>Découvrez notre collection complète de techniques de Jiu-Jitsu Brésilien, soigneusement documentées et catégorisées.</p>
            <p>Chaque technique est accompagnée de points clés, de transitions recommandées et de vidéos explicatives.</p>
            <p>Utilisez les filtres pour trouver rapidement la technique qui vous intéresse en fonction de votre niveau et de vos objectifs.</p>
          </div>
        </div>

        {/* Filtres */}
        <div className="mb-8">
          <div className="flex gap-4 items-center flex-wrap">
            <div className="relative flex-1 min-w-[200px] max-w-[400px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher une technique..."
                className="w-full pl-10 pr-4 py-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 
                          shadow-sm transition-all duration-200 ease-in-out
                          focus:ring-2 focus:ring-blue-500 focus:border-transparent
                          hover:shadow-md"
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 
                         shadow-sm transition-all duration-200 ease-in-out w-[160px]
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         hover:shadow-md cursor-pointer"
              onChange={(e) => setFilterPosition(e.target.value)}
            >
              <option value="all">Toutes les positions</option>
              <option value="garde_fermee">Garde Fermée</option>
              <option value="garde_ouverte">Garde Ouverte</option>
            </select>
            <select
              className="p-3 rounded-lg bg-white/80 backdrop-blur-sm border border-gray-200 
                         shadow-sm transition-all duration-200 ease-in-out w-[160px]
                         focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         hover:shadow-md cursor-pointer"
              onChange={(e) => setFilterCategory(e.target.value)}
            >
              <option value="all">Toutes les catégories</option>
              <option value="soumission">Soumission</option>
              <option value="sweep">Sweep</option>
            </select>
          </div>
        </div>
        {/* Grille de techniques */}
        <div className="max-w-[1600px] mx-auto">
          <div 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch'
            }}
          >
            {techniques.map((technique) => (
              <Card 
                key={technique.id}
                className="cursor-pointer bg-white/80 backdrop-blur-sm h-full
                           transition-all duration-300 ease-out transform
                           hover:shadow-lg hover:scale-[1.02] hover:-translate-y-1"
                onClick={() => {
                  setSelectedTechnique(technique)
                  setIsDetailOpen(true)
                }}
              >
                <img
                  src={technique.image}
                  alt={technique.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 
                                   text-transparent bg-clip-text leading-tight">{technique.name}</span>
                    <Badge className={`${getDifficultyColor(technique.difficulty)} transform transition-transform hover:scale-110`}>
                      {technique.difficulty}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex gap-2 flex-wrap">
                      <Badge variant="outline" className="transform transition-transform hover:scale-110">
                        {technique.position}
                      </Badge>
                      <Badge variant="outline" className="transform transition-transform hover:scale-110">
                        {technique.category}
                      </Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-1 text-gray-600 text-sm">Points clés :</h4>
                      <ul className="list-disc pl-4 text-sm text-gray-500">
                        {technique.keyPoints.map((point, index) => (
                          <li key={index} className="mb-1">{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Panneau latéral de détails */}
        <Sheet open={isDetailOpen} onOpenChange={setIsDetailOpen}>
          <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
            {selectedTechnique && (
              <>
                <SheetHeader>
                  <SheetTitle className="flex justify-between items-center text-xl">
                    {selectedTechnique.name}
                    <Badge className={getDifficultyColor(selectedTechnique.difficulty)}>
                      {selectedTechnique.difficulty}
                    </Badge>
                  </SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <img
                    src={selectedTechnique.image}
                    alt={selectedTechnique.name}
                    className="w-full rounded-lg"
                  />
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-gray-600">{selectedTechnique.description}</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Points clés</h3>
                    <ul className="list-disc pl-4 space-y-1 text-gray-600">
                      {selectedTechnique.keyPoints.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Transitions possibles</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedTechnique.transitions.map((transition, index) => (
                        <Badge key={index} variant="secondary">
                          {transition}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default TechniquesGrid