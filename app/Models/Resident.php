<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Resident extends Model
{
    protected $fillable = [
        'nik',
        'no_kk',
        'nama_lengkap',
        'jenis_kelamin',
        'alamat',
        'rt',
        'rw',
        'agama',
        'pendidikan_terakhir',
        'status_dalam_keluarga'
    ];
}
