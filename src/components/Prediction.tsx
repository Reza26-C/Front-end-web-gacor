import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calculator } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Prediction = () => {
  const { toast } = useToast();

  // 1. STATE UNTUK MENYIMPAN HASIL PREDIKSI
  const [result, setResult] = useState<any>(null);

  // 2. STATE UNTUK DATA INPUT
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
    
    // Reset hasil sebelumnya saat tombol ditekan
    setResult(null);

    // Tampilkan loading
    toast({
      title: "Sedang memproses...",
      description: "Mengirim data ke model AI...",
    });

    try {
      // KIRIM DATA KE PYTHON SERVER
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        let status = data.status; 
        let color = "";
        let message = "";

        // --- LOGIKA PENENTU WARNA & PESAN ---
        if (status && status.toLowerCase().includes("normal")) {
          // JIKA NORMAL (HIJAU)
          color = "bg-green-100 text-green-700 border-green-200";
          message = `Hasil analisis menunjukkan kondisi Normal (Skor: ${data.score?.toFixed(2) || '-'}). Pertahankan gizi anak!`;
        } else {
          // JIKA STUNTING (MERAH)
          color = "bg-red-100 text-red-700 border-red-200";
          message = `Hasil analisis menunjukkan risiko Stunting (Skor: ${data.score?.toFixed(2) || '-'}). Segera konsultasi ke dokter.`;
        }
        
        setResult({ status, message, color });
        
        toast({
          title: "Selesai!",
          description: "Hasil prediksi telah keluar.",
        });
      } else {
        throw new Error(data.error || "Gagal memproses");
      }

    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Gagal Terhubung",
        description: "Pastikan server python (server.py) sudah dinyalakan!",
      });
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // --- FUNGSI KHUSUS BLOKIR KARAKTER ANGKA DI NAMA ---
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Regex: Hanya izinkan Huruf (a-z), Spasi, Titik, Koma, Petik satu, dan Strip
    // ^[a-zA-Z\s.,'-]*$
    if (/^[a-zA-Z\s.,'-]*$/.test(value)) {
      handleChange("namaAnak", value);
    }
  };

  // --- FUNGSI KHUSUS BLOKIR MINUS DI KEYBOARD ---
  const blockInvalidChar = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Mencegah tombol: minus (-), plus (+), dan huruf e (eksponen)
    if (["-", "+", "e", "E"].includes(e.key)) {
      e.preventDefault();
    }
  };

  return (
    <section id="prediksi" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Prediksi Stunting
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Masukkan data anak untuk melakukan prediksi risiko stunting
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="flex items-center gap-2">
              <Calculator className="w-6 h-6 text-primary" />
              Form Prediksi Stunting
            </CardTitle>
            <CardDescription>
              Isi data dengan lengkap dan akurat untuk hasil prediksi yang optimal
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="namaAnak">Nama Anak</Label>
                <Input
                  id="namaAnak"
                  placeholder="Masukkan nama anak (Huruf saja)"
                  value={formData.namaAnak}
                  onChange={handleNameChange} // MENGGUNAKAN HANDLE KHUSUS NAMA
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
                    min="0" // Mencegah input negatif dari spinner browser
                    onKeyDown={blockInvalidChar} // Mencegah ketik minus
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
                    onKeyDown={blockInvalidChar} // Mencegah ketik minus
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
                    onKeyDown={blockInvalidChar} // Mencegah ketik minus
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
                    onKeyDown={blockInvalidChar} // Mencegah ketik minus
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
                    onKeyDown={blockInvalidChar} // Mencegah ketik minus
                    placeholder="Contoh: 85.5"
                    value={formData.panjangBadan}
                    onChange={(e) => handleChange("panjangBadan", e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg">
                Prediksi Sekarang
              </Button>

              {/* --- BAGIAN HASIL (MUNCUL JIKA ADA RESULT) --- */}
              {result && (
                <div className={`mt-6 p-4 rounded-lg border animate-in fade-in slide-in-from-bottom-4 duration-500 ${result.color}`}>
                  <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                    {result.status.toLowerCase().includes("normal") ? "✅" : "⚠️"} 
                    Hasil Analisis: {result.status}
                  </h3>
                  <p>{result.message}</p>
                </div>
              )}
              {/* --------------------------------------------- */}

              <p className="text-sm text-muted-foreground text-center mt-4">
                *Hasil prediksi bersifat estimasi dan sebaiknya dikonsultasikan dengan tenaga medis profesional
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Prediction;