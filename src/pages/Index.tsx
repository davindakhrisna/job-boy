import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Target, Heart, ArrowDown } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-200 via-yellow-100 to-yellow-100 px-8">
        <div className="tracking-widest absolute inset-0 opacity-5 font-bold text-6xl md:text-8xl h-screen flex py-36 justify-center">
          JOB BOY
        </div>
        <div className="max-w-5xl mx-auto text-justify md:text-center relative flex flex-col space-y-4 md:space-y-12 py-14 items-center h-full justify-evenly">
          <div className="text-center space-y-6">
            <img src="public/logo.svg" className="inline size-24 md:size-32" />
            <h1 className="text-justify md:text-center text-3xl md:text-5xl max-w-xl mx-auto font-bold text-black mb-6 tracking-wider">
              Temukan Diri dan Jalur Karier Anda
            </h1>
          </div>
          <p className="text-md md:text-lg text-black/90 mb-8 max-w-xl mx-auto leading-relaxed">
            Ambil survey kepribadian berbasis AI kami untuk mengungkap karir
            yang layak dan selaras dengan sifat, nilai, dan preferensi kerja
            unik Anda. Dapatkan dicocokkan dengan kedua peluang tradisional dan
            muncul.
          </p>
          <Button
            size="lg"
            onClick={() =>
              document
                .getElementById("go")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="hover:bg-white/90 text-lg p-4 h-auto bg-yellow-300 hover:bg-yellow-400 border !border-black rounded-full shadow-xl hover:shadow-2xl transition-all"
          >
            <ArrowDown className="w-12 h-12 text-black" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-8 bg-yellow-400 bg-gradient-radial from-transparent via-transparent to-yellow-200 from-center to-bottom">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-center text-foreground mb-12 max-w-xl mx-auto">
            Penilaian bertenaga AI kami menggabungkan psikologi dan etika untuk
            memandu Anda menuju karier yang memuaskan
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-yellow-500/50 !bg-yellow-100 transition-colors shadow-lg">
              <CardContent className="pt-8 text-center">
                <div className="inline-block p-4 bg-yellow-500/10 rounded-2xl mb-4">
                  <Sparkles className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Analisis Mendalam
                </h3>
                <p className="text-muted-foreground">
                  Jawab pertanyaan yang bijaksana yang mengungkap ciri
                  kepribadian, gaya kerja, dan nilai-nilai inti Anda menggunakan
                  analisis AI yang canggih.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-500/50 !bg-yellow-100 transition-colors shadow-lg">
              <CardContent className="pt-8 text-center">
                <div className="inline-block p-4 bg-accent/20 rounded-2xl mb-4">
                  <Target className="w-8 h-8 text-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Pencocokan Cerdas
                </h3>
                <p className="text-muted-foreground">
                  AI kami mencocokkan profil Anda dengan karier yang sesuai
                  sempurna dengan kepribadian dan aspirasi Anda.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-yellow-500/50 !bg-yellow-100 transition-colors shadow-lg">
              <CardContent className="pt-8 text-center">
                <div className="inline-block p-4 bg-yellow-500/10 rounded-2xl mb-4">
                  <Heart className="w-8 h-8 text-yellow-500" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">
                  Fokus Etis
                </h3>
                <p className="text-muted-foreground">
                  Temukan karier yang bermakna yang bernilai sosial, beretika
                  baik, dan berkontribusi positif terhadap masyarakat.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="px-8 bg-black bg-gradient-radial from-transparent via-transparent to-yellow-200 from-center to-bottom"
        id="go"
      >
        <div className="max-w-4xl mx-auto text-center flex items-center flex-col space-y-12 justify-between py-8">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 pt-12">
              Ready to Find Your Path?
            </h2>
            <p className="text-lg max-w-lg text-yellow-500">
              Langkah awal dimulai dari sini, dari mengenal diri sendiri. Form
              ini hanya membutuhkan 10 - 15 menit
            </p>
          </div>
          <Button
            size="lg"
            onClick={() => navigate("/assessment")}
            className="rounded-none p-4 size-32 border-yellow-500 bg-transparent hover:bg-transparent box-border border-4  shadow-lg hover:shadow-xl hover:border-yellow-600 transition-all"
          >
            <div className="bg-yellow-500 size-24 transition-all hover:size-26"></div>
          </Button>
          <p className="text-gray-500">Tim Andalusia @ Telkom University</p>
        </div>
      </section>
    </div>
  );
};

export default Index;
