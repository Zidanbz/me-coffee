import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowRight } from "lucide-react";

export default function UserGuidePage() {
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">Panduan Pengguna</h1>
      <Card>
        <CardHeader>
          <CardTitle>Selamat Datang di Me Coffee Dashboard!</CardTitle>
          <CardDescription>
            Panduan ini akan membantu Anda memahami dan menggunakan semua fitur yang tersedia untuk mengelola bisnis kopi Anda secara efisien.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">1. Dashboard</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  Dashboard adalah halaman utama Anda untuk melihat ringkasan bisnis secara cepat.
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Ringkasan Statistik:</strong> Anda akan melihat 4 kartu utama yang menampilkan:
                    <ul className="list-disc pl-6 mt-2">
                        <li><strong>Pendapatan Hari Ini:</strong> Total pemasukan yang tercatat hari ini.</li>
                        <li><strong>Pengeluaran Hari Ini:</strong> Total pengeluaran yang tercatat hari ini.</li>
                        <li><strong>Keuntungan:</strong> Selisih antara pendapatan dan pengeluaran hari ini.</li>
                        <li><strong>Stok Tersedia:</strong> Jumlah jenis bahan baku yang ada di inventaris Anda.</li>
                    </ul>
                  </li>
                  <li>
                    <strong>Grafik Pendapatan:</strong> Di bawah ringkasan, terdapat grafik interaktif untuk melacak pendapatan Anda dalam periode <strong>Harian</strong>, <strong>Mingguan</strong>, atau <strong>Bulanan</strong>.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">2. Mengelola Transaksi</AccordionTrigger>
              <AccordionContent className="space-y-4">
                 <p>
                  Halaman Transaksi adalah tempat Anda mencatat semua pemasukan dan pengeluaran.
                </p>
                <div className="space-y-3">
                    <h4 className="font-semibold">Menambah Transaksi Baru</h4>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Navigasi ke halaman <strong>Transaksi</strong> dari menu.</li>
                        <li>Gunakan form <strong>"Add Transaction"</strong>.</li>
                        <li>Isi semua field yang diperlukan:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>Tipe Transaksi:</strong> Pilih "Income" (Pemasukan) atau "Expense" (Pengeluaran).</li>
                            <li><strong>Tanggal:</strong> Tanggal transaksi terjadi.</li>
                            <li><strong>Jumlah:</strong> Nominal transaksi.</li>
                            <li><strong>Kategori:</strong> Kategori transaksi (misal: "Penjualan Minuman", "Sewa Tempat").</li>
                            <li><strong>Deskripsi:</strong> Penjelasan singkat mengenai transaksi.</li>
                             <li><strong>Metode Pembayaran:</strong> Pilih "Cash", "Card", atau "Online".</li>
                            </ul>
                        </li>
                        <li>Klik <strong>"Add Transaction"</strong> untuk menyimpan. Transaksi baru akan langsung muncul di tabel di sebelah kanan.</li>
                    </ol>
                </div>
                 <div className="space-y-3">
                    <h4 className="font-semibold">Mengedit atau Menghapus Transaksi</h4>
                     <ol className="list-decimal pl-6 space-y-2">
                        <li>Di tabel "Recent Transactions", cari transaksi yang ingin Anda ubah.</li>
                        <li>Di kolom "Actions", Anda akan melihat dua ikon:
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>Ikon Pensil:</strong> Klik untuk mengedit. Sebuah dialog akan muncul dengan data transaksi yang bisa Anda ubah.</li>
                                <li><strong>Ikon Sampah:</strong> Klik untuk menghapus. Sebuah dialog konfirmasi akan muncul untuk memastikan Anda tidak salah hapus.</li>
                            </ul>
                        </li>
                        <li>Perubahan akan langsung terlihat setelah Anda menyimpan atau mengkonfirmasi.</li>
                    </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">3. Perhitungan HPP (Harga Pokok Penjualan)</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  Halaman HPP membantu Anda mengelola stok bahan baku dan menghitung modal untuk setiap produk yang Anda jual. Halaman ini terbagi menjadi 3 bagian utama.
                </p>
                <div className="space-y-3">
                    <h4 className="font-semibold">Bagian 1: Tambah Bahan Baku</h4>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>Gunakan form <strong>"Tambah Bahan Baku"</strong> untuk mendaftarkan bahan yang Anda beli.</li>
                        <li>
                            <strong>Isi detail bahan:</strong>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>Nama Bahan:</strong> Nama untuk bahan (misal: "Biji Kopi Arabika", "Susu Full Cream 1L").</li>
                                <li><strong>Kuantitas Total:</strong> Jumlah bahan yang dibeli dalam satu transaksi (misal: 1000 untuk 1000 gram).</li>
                                <li><strong>Satuan:</strong> Satuan untuk kuantitas (misal: gr, ml, pcs).</li>
                                <li><strong>Harga Total:</strong> Harga keseluruhan untuk kuantitas tersebut.</li>
                            </ul>
                        </li>
                         <li>
                            <strong>Contoh:</strong> Jika Anda membeli 1 kg (1000 gr) biji kopi seharga Rp 150.000, Anda akan mengisi: 1000 gr, dengan harga 150000. Sistem akan otomatis menghitung harga per gram.
                        </li>
                        <li>Klik <strong>"Tambah Bahan"</strong>. Bahan akan muncul di tabel "Stok Bahan Baku".</li>
                    </ol>
                </div>
                 <div className="space-y-3">
                    <h4 className="font-semibold">Bagian 2: Stok Bahan Baku</h4>
                     <p>
                        Tabel ini menampilkan semua bahan yang telah Anda tambahkan. Di sini, Anda juga bisa <strong>mengedit</strong> atau <strong>menghapus</strong> bahan baku menggunakan ikon di kolom "Aksi", sama seperti pada halaman transaksi.
                    </p>
                </div>
                <div className="space-y-3">
                    <h4 className="font-semibold">Bagian 3: Kalkulator HPP Resep</h4>
                     <ol className="list-decimal pl-6 space-y-2">
                        <li>Pilih bahan dari dropdown <strong>"Pilih bahan baku..."</strong> dan klik <strong>"Tambah"</strong> untuk memasukkannya ke resep.</li>
                        <li>
                           Di dalam tabel resep, masukkan <strong>"Kuantitas Pakai"</strong> sesuai dengan jumlah yang dibutuhkan untuk membuat <strong>satu porsi</strong> produk.
                        </li>
                        <li>
                           Total HPP (modal per produk) akan dihitung secara otomatis di bagian kanan bawah. Anda bisa bereksperimen dengan kuantitas untuk menyesuaikan resep dan biaya.
                        </li>
                    </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
