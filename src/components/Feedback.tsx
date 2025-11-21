import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const Feedback = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. State untuk menyimpan data inputan user
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    kategori: "",
    rating: "",
    pesan: ""
  });

  // 2. Fungsi untuk update state saat input berubah
  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // 3. Fungsi Submit ke Server Python
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Kirim data ke endpoint /feedback di server.py
      const response = await fetch('http://127.0.0.1:5000/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        // Jika sukses, tampilkan pesan sukses & reset form
        toast({
          title: "Terima Kasih!",
          description: "Kritik dan saran Anda telah kami terima dan tersimpan.",
          className: "bg-green-100 border-green-200 text-green-800",
        });
        setFormData({ nama: "", email: "", kategori: "", rating: "", pesan: "" });
      } else {
        throw new Error(data.message || "Gagal mengirim data");
      }

    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Gagal Mengirim",
        description: "Pastikan server backend (server.py) sudah dinyalakan!",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="kritik" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Kritik & Saran
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Pendapat Anda sangat penting untuk pengembangan layanan kami
          </p>
        </div>

        <Card className="max-w-2xl mx-auto shadow-lg">
          <CardHeader className="bg-secondary/50">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-6 h-6 text-primary" />
              Form Kritik dan Saran
            </CardTitle>
            <CardDescription>
              Bantu kami meningkatkan layanan dengan memberikan masukan Anda
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-2">
                <Label htmlFor="nama">Nama</Label>
                <Input
                  id="nama"
                  placeholder="Masukkan nama Anda (opsional)"
                  value={formData.nama}
                  onChange={(e) => handleChange("nama", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="kategori">Kategori</Label>
                <Select 
                  required 
                  value={formData.kategori} 
                  onValueChange={(val) => handleChange("kategori", val)}
                >
                  <SelectTrigger id="kategori">
                    <SelectValue placeholder="Pilih kategori" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Kritik">Kritik</SelectItem>
                    <SelectItem value="Saran">Saran</SelectItem>
                    <SelectItem value="Pujian">Pujian</SelectItem>
                    <SelectItem value="Pertanyaan">Pertanyaan</SelectItem>
                    <SelectItem value="Bug/Error">Laporan Error</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="rating">Rating Layanan</Label>
                <Select 
                  required 
                  value={formData.rating} 
                  onValueChange={(val) => handleChange("rating", val)}
                >
                  <SelectTrigger id="rating">
                    <SelectValue placeholder="Pilih rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">⭐⭐⭐⭐⭐ Sangat Baik</SelectItem>
                    <SelectItem value="4">⭐⭐⭐⭐ Baik</SelectItem>
                    <SelectItem value="3">⭐⭐⭐ Cukup</SelectItem>
                    <SelectItem value="2">⭐⭐ Kurang</SelectItem>
                    <SelectItem value="1">⭐ Sangat Kurang</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pesan">Pesan</Label>
                <Textarea
                  id="pesan"
                  placeholder="Tuliskan kritik atau saran Anda..."
                  rows={6}
                  required
                  value={formData.pesan}
                  onChange={(e) => handleChange("pesan", e.target.value)}
                />
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                {isSubmitting ? "Sedang Mengirim..." : "Kirim Feedback"}
              </Button>

              <p className="text-sm text-muted-foreground text-center">
                Semua feedback akan ditinjau dan digunakan untuk meningkatkan layanan kami
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Feedback;