import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function UserGuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Panduan Pengguna</h1>
      <Card>
        <CardHeader>
          <CardTitle>Cara Menggunakan Kalkulator HPP</CardTitle>
          <CardDescription>
            Panduan langkah demi langkah untuk menghitung Harga Pokok Penjualan (HPP) produk Anda.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">Langkah 1: Tambah Bahan Baku</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  Pertama, Anda perlu mendaftarkan semua bahan baku yang Anda gunakan. Ini adalah bahan-bahan yang Anda beli dari supplier.
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Buka halaman HPP:</strong> Navigasi ke halaman HPP dari menu samping.
                  </li>
                  <li>
                    <strong>Cari form "Tambah Bahan Baku":</strong> Di sini Anda akan memasukkan detail bahan yang Anda beli.
                  </li>
                  <li>
                    <strong>Isi detail bahan:</strong>
                    <ul className="list-disc pl-6 mt-2 space-y-1">
                      <li><strong>Nama Bahan:</strong> Nama yang jelas untuk bahan tersebut (misal: "Biji Kopi Arabika", "Susu Full Cream 1L").</li>
                      <li><strong>Kuantitas Total:</strong> Jumlah total bahan yang Anda beli dalam satu kali transaksi (misal: 1000 untuk 1000 gram, atau 1 untuk 1 liter).</li>
                      <li><strong>Satuan:</strong> Satuan untuk kuantitas total (misal: gr, ml, pcs, kg, L).</li>
                      <li><strong>Harga Total:</strong> Harga keseluruhan yang Anda bayar untuk kuantitas total tersebut.</li>
                    </ul>
                  </li>
                   <li>
                    <strong>Contoh:</strong> Jika Anda membeli 1 kg (1000 gr) biji kopi seharga Rp 150.000, Anda akan mengisi:
                     <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Nama Bahan: Biji Kopi Robusta</li>
                        <li>Kuantitas Total: 1000</li>
                        <li>Satuan: gr</li>
                        <li>Harga Total: 150000</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Klik "Tambah Bahan":</strong> Bahan Anda sekarang tersimpan dan akan muncul di tabel "Stok Bahan Baku". Sistem secara otomatis menghitung harga per satuan untuk Anda.
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">Langkah 2: Buat Resep di Kalkulator HPP</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  Setelah semua bahan baku Anda terdaftar, Anda bisa mulai membuat resep untuk produk jadi Anda.
                </p>
                <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Gunakan "Kalkulator HPP Resep":</strong> Bagian ini berada di bagian atas halaman HPP.
                  </li>
                  <li>
                    <strong>Pilih bahan dari dropdown:</strong> Klik dropdown "Pilih bahan baku..." untuk melihat semua bahan yang sudah Anda tambahkan. Pilih salah satu bahan untuk resep Anda.
                  </li>
                  <li>
                    <strong>Klik "Tambah":</strong> Bahan tersebut akan ditambahkan ke tabel resep di bawahnya.
                  </li>
                  <li>
                    <strong>Masukkan Kuantitas Pakai:</strong> Di dalam tabel resep, ubah kolom "Kuantitas Pakai" sesuai dengan jumlah bahan yang Anda butuhkan untuk membuat <strong>satu</strong> porsi produk. Satuannya harus sama dengan satuan yang Anda masukkan di stok.
                  </li>
                   <li>
                    <strong>Contoh Resep Es Kopi Susu:</strong>
                     <ul className="list-disc pl-6 mt-2 space-y-1">
                        <li>Tambahkan "Biji Kopi Robusta", set Kuantitas Pakai ke <strong>20</strong> (untuk 20 gr).</li>
                        <li>Tambahkan "Susu Full Cream", set Kuantitas Pakai ke <strong>150</strong> (untuk 150 ml).</li>
                        <li>Tambahkan "Gula Aren Cair", set Kuantitas Pakai ke <strong>15</strong> (untuk 15 ml).</li>
                    </ul>
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">Langkah 3: Lihat Hasil HPP</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  Total HPP dihitung secara otomatis saat Anda mengubah resep.
                </p>
                 <ol className="list-decimal pl-6 space-y-2">
                  <li>
                    <strong>Perhatikan Total HPP:</strong> Di bagian kanan bawah kartu Kalkulator, Anda akan melihat "Total HPP per Produk".
                  </li>
                  <li>
                    <strong>Angka ini adalah modal Anda:</strong> Ini adalah total biaya bahan baku untuk membuat satu porsi produk sesuai resep yang Anda masukkan.
                  </li>
                  <li>
                    <strong>Eksperimen:</strong> Anda bisa mengubah "Kuantitas Pakai" kapan saja untuk melihat bagaimana perubahan resep mempengaruhi HPP Anda. Ini membantu Anda menemukan resep yang paling efisien dari segi biaya.
                  </li>
                </ol>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
