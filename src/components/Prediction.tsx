import { useState, useEffect } from "react";
import * as tf from "@tensorflow/tfjs"; // Import TensorFlow.js
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Prediction = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<any>(null);
  const [model, setModel] = useState<tf.LayersModel | null>(null);

  // --- KONFIGURASI SCALER (Ganti nilai ini sesuai hasil training Anda) ---
  // Karena kita tidak memakai scaler.pkl, kita masukkan nilai mean & std secara manual
  const scalerParams = {
    mean: [14.90277319  2.76429515 49.09078904  7.61678772 69.04057445], // Contoh: Mean untuk Age, BirthWeight, dll
    std: [8.60481693 0.2959524  0.43457117 1.769163   9.49217264]      // Contoh: Std untuk Age, BirthWeight, dll
  };

  const [formData, setFormData] = useState({
    namaAnak: "",
    jenisKelamin: "",
    umur: "",
    beratLahir: "",
    panjangLahir: "",
    beratBadan: "",
    panjangBadan: "",
  });

  // 3. LOAD MODEL SAAT KOMPONEN DIBUKA
  useEffect(() => {
    const loadModel = async () => {
      try {
        // Path ke model yang sudah diconvert di folder public
        const loadedModel = await tf.loadLayersModel("/tfjs_model/model.json");
        setModel(loadedModel);
        console.log("✅ Model Loaded Successfully on Client Side");
      } catch (err) {
        console.error("Gagal memuat model:", err);
      }
    };
    loadModel();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);

    if (!model) {
      toast({ variant: "destructive", title: "Model belum siap", description: "Tunggu sebentar..." });
      return;
    }

    try {
      // 4. PROSES DATA (PRE-PROCESSING)
      const gender_val = formData.jenisKelamin === "Male" ? 1 : 0;
      const rawFeatures = [
        parseFloat(formData.umur),
        parseFloat(formData.beratLahir),
        parseFloat(formData.panjangLahir),
        parseFloat(formData.beratBadan),
        parseFloat(formData.panjangBadan)
      ];

      // Manual Scaling: (x - mean) / std
      const scaledFeatures = rawFeatures.map((val, i) => (val - scalerParams.mean[i]) / scalerParams.std[i]);

      // Gabungkan Gender + Scaled Features
      const inputTensor = tf.tensor2d([[gender_val, ...scaledFeatures]]);

      // 5. INFERENSI / PREDIKSI
      const prediction: any = model.predict(inputTensor);
      const scoreArray = await prediction.data();
      const score = scoreArray[0];

      // 6. LOGIKA HASIL
      let status = score < 0.7 ? "Stunting" : "Normal";
      let color = score < 0.7 
        ? "bg-red-100 text-red-700 border-red-200" 
        : "bg-green-100 text-green-700 border-green-200";
      
      let message = score < 0.7
        ? `Risiko Stunting Terdeteksi (Skor: ${score.toFixed(4)}). Segera konsultasi.`
        : `Kondisi Normal (Skor: ${score.toFixed(4)}). Pertahankan gizi!`;

      setResult({ status, message, color });
      
      toast({ title: "Selesai!", description: "Perhitungan Client-Side Berhasil." });

    } catch (error) {
      console.error(error);
      toast({ variant: "destructive", title: "Error", description: "Terjadi kesalahan perhitungan." });
    }
  };

  // ... (fungsi handleChange, handleNameChange, blockInvalidChar tetap sama) ...
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^[a-zA-Z\s.,'-]*$/.test(value)) {
      handleChange("namaAnak", value);
    }
  };

  const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <section id="prediksi" className="py-20 bg-background">
        {/* ... (UI JSX tetap sama seperti kode Anda sebelumnya) ... */}
        {/* Pastikan form onSubmit memanggil handleSubmit yang baru ini */}
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Prediksi Stunting (Local AI)
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Data diproses langsung di perangkat Anda tanpa melalui server.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              Form Prediksi Stunting
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="namaAnak">Nama Anak</Label>
                <Input
                  id="namaAnak"
                  placeholder="Masukkan nama anak"
                  value={formData.namaAnak}
                  onChange={handleNameChange}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                  <Select
                    value={formData.jenisKelamin}
                    onValueChange={(value) => handleChange("jenisKelamin", value)}
                    required
                  >
                    <SelectTrigger id="jenisKelamin">
                      <SelectValue placeholder="Pilih jenis kelamin" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Male">Laki-laki</SelectItem>
                      <SelectItem value="Female">Perempuan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="umur">Umur (bulan)</Label>
                  <Input
                    id="umur"
                    type="number"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    placeholder="Contoh: 24"
                    value={formData.umur}
                    onChange={(e) => handleChange("umur", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beratLahir">Berat Lahir (kg)</Label>
                  <Input
                    id="beratLahir"
                    type="number"
                    step="0.1"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    placeholder="Contoh: 3.2"
                    value={formData.beratLahir}
                    onChange={(e) => handleChange("beratLahir", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panjangLahir">Panjang Lahir (cm)</Label>
                  <Input
                    id="panjangLahir"
                    type="number"
                    step="0.1"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    placeholder="Contoh: 49"
                    value={formData.panjangLahir}
                    onChange={(e) => handleChange("panjangLahir", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="beratBadan">Berat Badan Sekarang (kg)</Label>
                  <Input
                    id="beratBadan"
                    type="number"
                    step="0.1"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    placeholder="Contoh: 12.5"
                    value={formData.beratBadan}
                    onChange={(e) => handleChange("beratBadan", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="panjangBadan">Panjang Badan Sekarang (cm)</Label>
                  <Input
                    id="panjangBadan"
                    type="number"
                    step="0.1"
                    min="0"
                    onKeyDown={blockInvalidChar}
                    placeholder="Contoh: 85.5"
                    value={formData.panjangBadan}
                    onChange={(e) => handleChange("panjangBadan", e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={!model}>
                {model ? "Prediksi Sekarang" : "Memuat Model AI..."}
              </Button>

              {result && (
                <div className={`mt-6 p-4 rounded-lg border animate-in fade-in slide-in-from-bottom-4 duration-500 ${result.color}`}>
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                    {result.status.toLowerCase().includes("normal") ? "✅" : "⚠️"} 
                    Hasil Analisis: {result.status}
                  </h3>
                  <p>{result.message}</p>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Prediction;
