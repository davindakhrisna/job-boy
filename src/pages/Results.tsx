import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Sparkles, TrendingUp, Shield, Heart } from "lucide-react";

interface PersonalityTrait {
  name: string;
  description: string;
  strength: string;
}

interface CareerRecommendation {
  title: string;
  match: number;
  description: string;
  whyGoodFit: string;
  decencyFactors: string[];
  growthAreas: string;
}

interface AnalysisResults {
  personalityProfile: {
    summary: string;
    traits: PersonalityTrait[];
    strengths: string[];
    workStyle: string;
  };
  careerRecommendations: CareerRecommendation[];
}

const Results = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<AnalysisResults | null>(null);

  useEffect(() => {
    const storedResults = sessionStorage.getItem("assessmentResults");
    if (!storedResults) {
      navigate("/");
      return;
    }
    setResults(JSON.parse(storedResults));
  }, [navigate]);

  if (!results) {
    return null;
  }

  const getStrengthColor = (strength: string) => {
    switch (strength.toLowerCase()) {
      case "high":
      case "tinggi":
        return "bg-primary";
      case "medium":
      case "sedang":
        return "bg-accent";
      case "low":
      case "rendah":
        return "bg-gray-300";
      default:
        return "bg-gray-300";
    }
  };

  const translateStrength = (strength: string) => {
    switch (strength.toLowerCase()) {
      case "high":
        return "Tinggi";
      case "medium":
        return "Sedang";
      case "low":
        return "Rendah";
      default:
        return strength;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-yellow-200/55 to-yellow-500/10 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Button
            onClick={() => navigate("/")}
            className="mb-4 !bg-yellow-400 hover:!bg-yellow-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
          <h1 className="text-4xl font-bold mb-2">Profil Kepribadian Anda</h1>
          <p className="text-muted-foreground">
            Temukan kekuatan Anda dan temukan karier yang sesuai dengan
            nilai-nilai Anda
          </p>
        </div>

        {/* Personality Overview */}
        <Card className="mb-8 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-yellow-500" />
              Ringkasan Kepribadian
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-foreground leading-relaxed">
              {results.personalityProfile.summary}
            </p>

            <div>
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-yellow-500" />
                Sifat-Sifat Inti
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {results.personalityProfile.traits.map((trait, idx) => (
                  <div key={idx} className="p-4 bg-yellow-50 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-foreground">
                        {trait.name}
                      </h4>
                      <Badge className={getStrengthColor(trait.strength)}>
                        {translateStrength(trait.strength)}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {trait.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-3">Kekuatan Kunci</h3>
              <div className="flex flex-wrap gap-2">
                {results.personalityProfile.strengths.map((strength, idx) => (
                  <Badge key={idx} variant="secondary" className="px-3 py-1">
                    {strength}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Gaya Kerja</h3>
              <p className="text-muted-foreground leading-relaxed">
                {results.personalityProfile.workStyle}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Career Recommendations */}
        <div>
          <h2 className="text-3xl font-bold text-foreground mb-6">
            Jalur Karier yang Direkomendasikan
          </h2>
          <div className="grid gap-6">
            {results.careerRecommendations.map((career, idx) => (
              <Card
                key={idx}
                className="shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-2xl mb-2">
                        {career.title}
                      </CardTitle>
                      <CardDescription>{career.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-yellow-500">
                        {career.match}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Kecocokan
                      </div>
                    </div>
                  </div>
                  <Progress value={career.match} className="mt-4" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Heart className="w-4 h-4 text-yellow-500" />
                      Mengapa Ini Cocok untuk Anda
                    </h4>
                    <p className="text-muted-foreground">{career.whyGoodFit}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4 text-yellow-500" />
                      Aspek Etis & Bermakna
                    </h4>
                    <ul className="space-y-1">
                      {career.decencyFactors.map((factor, fIdx) => (
                        <li
                          key={fIdx}
                          className="text-sm text-muted-foreground flex items-start gap-2"
                        >
                          <span className="text-yellow-500 mt-1">•</span>
                          <span>{factor}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-yellow-500" />
                      Peluang Pengembangan
                    </h4>
                    <p className="text-muted-foreground">
                      {career.growthAreas}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Button
            size="lg"
            onClick={() => navigate("/")}
            className="bg-yellow-400 text-white hober:bg-yellow-500"
          >
            Ambil Penilaian Lagi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Results;
