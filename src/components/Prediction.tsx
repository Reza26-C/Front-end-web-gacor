import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Prediction = () => {
  const { toast } = useToast();
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    namaAnak: "",
    jenisKelamin: "",
    umur: "",
    beratLahir: "",
    panjangLahir: "",
    beratBadan: "",
    panjangBadan: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResult(null);
    setLoading(true);

    // Simulasi loading sebentar agar terasa "memproses"
    setTimeout(() => {
      try {
        // --- LOGIKA PERHITUNGAN SEDERHANA (Manual) ---
        // Catatan: Ini adalah estimasi kasar, bukan Standar WHO yang presisi.
        
        const umurBulan = parseFloat(formData.umur);
        const tinggiBadan = parseFloat(formData.panjangBadan);
        
        // Rumus Estimasi Tinggi Ideal Sederhana:
        // Lahir rata-rata 49-50cm.
        // Umur 0-12 bulan: tumbuh cepat (~25cm setahun)
        // Umur > 12 bulan: tumbuh melambat (~10-12cm setahun)
        let standarTinggi = 50; 
        
        if (umurBulan <= 12) {
            standarTinggi = 50 + (umurBulan * 2.0); 
        } else {
            standarTinggi = 74 + ((umurBulan - 12) * 1.0);
        }

        // Jika laki-laki, biasanya sedikit lebih tinggi (+1-2 cm di rumus kasar)
        if (formData.jenisKelamin === "Male") {
            standarTinggi += 2;
        }

        // Ambang batas stunting (misal: di bawah 90% dari tinggi ideal rata-rata)
        const threshold = standarTinggi * 0.90; 
        
        const isStunting = tinggiBadan < threshold;
        
        // Hitung "Skor" simulasi (Persentase kecukupan tinggi badan)
        const score = (tinggiBadan / standarTinggi); 

        // LOGIKA HASIL
        let status = isStunting ? "Stunting" : "Normal";
        let color = isStunting 
          ? "bg-red-100 text-red-700 border-red-200" 
          : "bg-green-100 text-green-700 border-green-200";
        
        let message = isStunting
          ? `Tinggi badan anak (${tinggiBadan} cm) berada di bawah estimasi wajar untuk umur ${umurBulan} bulan (Target > ${threshold.toFixed(1)} cm).`
          : `Tinggi badan anak (${tinggiBadan} cm) sesuai dengan estimasi pertumbuhan normal.`;

        setResult({ status, message, color });
        toast({ title: "Selesai!", description: "Perhitungan berhasil." });

      } catch (error) {
        console.error(error);
        toast({ variant: "destructive", title: "Error", description: "Pastikan semua data angka diisi dengan benar." });
      } finally {
        setLoading(false);
      }
    }, 1000); // Delay 1 detik
  };

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
        <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Cek Status Gizi
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Perhitungan estimasi pertumbuhan anak berdasarkan data fisik.
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              Prediksi Stunting
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

              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? "Sedang Memprediksi" : "Prediksi"}
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
