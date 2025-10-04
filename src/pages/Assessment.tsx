import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const QUESTIONS = [
  {
    id: 1,
    question: "Bagaimana Anda biasanya menghadapi tantangan atau masalah baru?",
    placeholder:
      "Jelaskan gaya pemecahan masalah Anda, apakah Anda lebih suka menganalisis mendalam, mengambil tindakan cepat, berkolaborasi dengan orang lain, dll.",
  },
  {
    id: 2,
    question:
      "Jenis lingkungan kerja seperti apa yang membantu Anda berkembang?",
    placeholder:
      "Pikirkan aspek seperti dinamika tim, otonomi, struktur, kreativitas, kecepatan, dll.",
  },
  {
    id: 3,
    question:
      "Nilai-nilai apa yang paling penting bagi Anda dalam kehidupan profesional?",
    placeholder:
      "Pertimbangkan hal-hal seperti integritas, inovasi, membantu orang lain, stabilitas, pertumbuhan, dampak sosial, dll.",
  },
  {
    id: 4,
    question:
      "Bagaimana Anda menangani stres dan tekanan dalam situasi yang menuntut?",
    placeholder:
      "Jelaskan bagaimana Anda menghadapi stres dan bagaimana Anda menjaga keseimbangan",
  },
  {
    id: 5,
    question:
      "Apa yang memotivasi Anda untuk memberikan yang terbaik dalam pekerjaan?",
    placeholder:
      "Pikirkan tentang motivator intrinsik dan ekstrinsik, pengakuan, dampak, belajar, dll.",
  },
  {
    id: 6,
    question: "Jelaskan gaya komunikasi dan kolaborasi Anda.",
    placeholder:
      "Bagaimana Anda lebih suka bekerja dengan orang lain? Apakah Anda lebih menjadi pendengar atau pembicara? Langsung atau diplomatis?",
  },
  {
    id: 7,
    question:
      "Apa kekuatan alami Anda dan aktivitas mana yang memberi energi pada Anda?",
    placeholder:
      "Pertimbangkan baik hard skills atau soft skills, dan aktivitas di mana Anda merasa dalam kondisi flow",
  },
  {
    id: 8,
    question:
      "Jenis dampak apa yang ingin Anda berikan melalui pekerjaan Anda?",
    placeholder:
      "Pikirkan tentang impact yang ingin Anda tinggalkan dan perubahan yang ingin Anda ciptakan",
  },
];

const Assessment = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const progress = ((currentQuestion + 1) / QUESTIONS.length) * 100;
  const currentAnswer = answers[currentQuestion] || "";

  const handleNext = () => {
    if (!currentAnswer.trim()) {
      toast.error("Silakan berikan jawaban sebelum melanjutkan");
      return;
    }

    if (currentQuestion < QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = async () => {
    setIsAnalyzing(true);

    try {
      const formattedAnswers = QUESTIONS.map((q, idx) => ({
        question: q.question,
        answer: answers[idx] || "",
      }));

      const { data, error } = await supabase.functions.invoke(
        "analyze-personality",
        {
          body: { 
            answers: formattedAnswers,
            language: "Indonesian",
            instructions: "Please respond entirely in Indonesian language. All personality analysis, career recommendations, descriptions, and insights should be written in Indonesian (Bahasa Indonesia)."
          },
        },
      );

      if (error) throw error;

      // Debug: Log the data to see what language it's in
      console.log("AI Analysis Results:", JSON.stringify(data, null, 2));

      // Store results in session storage for the results page
      sessionStorage.setItem("assessmentResults", JSON.stringify(data));
      navigate("/results");
    } catch (error) {
      console.error("Analysis error:", error);
      toast.error("Gagal menganalisis respons Anda. Silakan coba lagi.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-yellow-100 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Penilaian Kepribadian
          </h1>
          <Progress value={progress} className="mt-4" />
        </div>

        <Card className="shadow-lg bg-yellow-200">
          <CardContent className="pt-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-foreground mb-4">
                  {QUESTIONS[currentQuestion].question}
                </h2>
                <Textarea
                  value={currentAnswer}
                  onChange={(e) =>
                    setAnswers({
                      ...answers,
                      [currentQuestion]: e.target.value,
                    })
                  }
                  placeholder={QUESTIONS[currentQuestion].placeholder}
                  className="min-h-[200px] resize-none bg-yellow-50"
                />
              </div>

              <div className="flex justify-between items-center pt-4">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentQuestion === 0 || isAnalyzing}
                  className="hover:bg-yellow-50"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                <p className="text-muted-foreground">
                  Question {currentQuestion + 1} dari {QUESTIONS.length}
                </p>

                <Button
                  onClick={handleNext}
                  disabled={!currentAnswer.trim() || isAnalyzing}
                  className="bg-gray-950 hover:bg-black"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Menganalisis...
                    </>
                  ) : currentQuestion === QUESTIONS.length - 1 ? (
                    "Submit"
                  ) : (
                    <>
                      Next
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Assessment;
