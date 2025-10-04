import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, Sparkles, Target, Heart, ArrowDown } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const navigate = useNavigate();

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const scaleIn = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, ease: "easeOut" },
  };

  const bounceIn = {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 10,
        duration: 0.6,
      },
    },
  };

  const floatAnimation = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-200 via-yellow-100 to-yellow-100 px-8">
        <motion.div
          className="tracking-widest absolute inset-0 opacity-5 font-bold text-6xl md:text-8xl h-screen flex py-36 justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
          transition={{ duration: 2, delay: 0.5 }}
        >
          JOB BOY
        </motion.div>
        <div className="max-w-5xl mx-auto text-justify md:text-center relative flex flex-col space-y-4 md:space-y-12 py-14 items-center h-full justify-evenly">
          <motion.div
            className="text-center space-y-6"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.img
              src="public/logo.svg"
              className="inline size-24 md:size-32"
              variants={bounceIn}
              {...floatAnimation}
            />
            <motion.h1
              className="text-justify md:text-center text-3xl md:text-5xl max-w-xl mx-auto font-bold text-black mb-6 tracking-wider"
              variants={fadeInUp}
            >
              Temukan Diri dan Jalur Karier Anda
            </motion.h1>
          </motion.div>
          <motion.p
            className="text-md md:text-lg text-black/90 mb-8 max-w-xl mx-auto leading-relaxed"
            {...fadeInUp}
            transition={{ delay: 0.3 }}
          >
            Ambil survey kepribadian berbasis AI kami untuk mengungkap karir
            yang layak dan selaras dengan sifat, nilai, dan preferensi kerja
            unik Anda. Dapatkan dicocokkan dengan kedua peluang tradisional dan
            muncul.
          </motion.p>
          <motion.div {...fadeInUp} transition={{ delay: 0.6 }}>
            <Button
              size="lg"
              onClick={() =>
                document
                  .getElementById("go")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hover:bg-white/90 text-lg p-4 h-auto bg-yellow-300 hover:bg-yellow-400 border !border-black rounded-full shadow-xl hover:shadow-2xl transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <ArrowDown className="w-12 h-12 text-black" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <motion.section
        className="py-20 px-8 bg-yellow-400 bg-gradient-radial from-transparent via-transparent to-yellow-200 from-center to-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-center text-foreground mb-4"
            {...fadeInUp}
            transition={{ delay: 0.2 }}
          >
            How It Works
          </motion.h2>
          <motion.p
            className="text-center text-foreground mb-12 max-w-xl mx-auto"
            {...fadeInUp}
            transition={{ delay: 0.4 }}
          >
            Penilaian bertenaga AI kami menggabungkan psikologi dan etika untuk
            memandu Anda menuju karier yang memuaskan
          </motion.p>

          <motion.div
            className="grid md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div variants={fadeInUp}>
              <Card className="border-2 hover:border-yellow-500/50 !bg-yellow-100 transition-colors shadow-lg">
                <CardContent className="pt-8 text-center">
                  <motion.div
                    className="inline-block p-4 bg-yellow-500/10 rounded-2xl mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Sparkles className="w-8 h-8 text-yellow-500" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Analisis Mendalam
                  </h3>
                  <p className="text-muted-foreground">
                    Jawab pertanyaan yang bijaksana yang mengungkap ciri
                    kepribadian, gaya kerja, dan nilai-nilai inti Anda
                    menggunakan analisis AI yang canggih.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-2 hover:border-yellow-500/50 !bg-yellow-100 transition-colors shadow-lg">
                <CardContent className="pt-8 text-center">
                  <motion.div
                    className="inline-block p-4 bg-accent/20 rounded-2xl mb-4"
                    whileHover={{ scale: 1.1, rotate: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Target className="w-8 h-8 text-accent" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Pencocokan Cerdas
                  </h3>
                  <p className="text-muted-foreground">
                    AI kami mencocokkan profil dari personality Anda dengan
                    karier yang sesuai sempurna, menciptakan hasil dengan
                    tingkat kepercayaan yang tinggi
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Card className="border-2 hover:border-yellow-500/50 !bg-yellow-100 transition-colors shadow-lg">
                <CardContent className="pt-8 text-center">
                  <motion.div
                    className="inline-block p-4 bg-yellow-500/10 rounded-2xl mb-4"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Heart className="w-8 h-8 text-yellow-500" />
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Fokus Etis
                  </h3>
                  <p className="text-muted-foreground">
                    Temukan karier yang bermakna yang bernilai sosial, beretika
                    baik, dan berkontribusi positif terhadap masyarakat.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="px-8 bg-black bg-gradient-radial from-transparent via-transparent to-yellow-200 from-center to-bottom"
        id="go"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto text-center flex items-center flex-col space-y-12 justify-between py-8">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.h2
              className="text-3xl md:text-4xl font-bold text-yellow-400 mb-6 pt-12"
              variants={fadeInUp}
            >
              Ready to Find Your Path?
            </motion.h2>
            <motion.p
              className="text-lg max-w-lg text-yellow-500"
              variants={fadeInUp}
            >
              Langkah awal dimulai dari sini, dari mengenal diri sendiri. Form
              ini hanya membutuhkan 10 - 15 menit
            </motion.p>
          </motion.div>
          <motion.div {...bounceIn} transition={{ delay: 0.4 }}>
            <Button
              size="lg"
              onClick={() => navigate("/assessment")}
              className="rounded-none p-4 size-32 border-yellow-500 bg-transparent hover:bg-transparent box-border border-4  shadow-lg hover:shadow-xl hover:border-yellow-600 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                className="bg-yellow-500 size-24 transition-all hover:size-26"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </Button>
          </motion.div>
          <motion.p
            className="text-gray-500"
            {...fadeInUp}
            transition={{ delay: 0.6 }}
          >
            Tim Andalusia @ Telkom University
          </motion.p>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
