<?php

namespace App\Http\Controllers;

use App\Models\Resident;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ResidentController extends Controller
{
    public function index()
    {
        return Inertia::render('Residents/Index', [
            'residents' => Resident::all(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Residents/Create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'nik' => 'required|string|size:16|unique:residents,nik',
            'nama_lengkap' => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'rt' => 'required|string|size:3',
            'rw' => 'required|string|size:3',
            'agama' => 'required|string|max:20',
            'pendidikan_terakhir' => 'required|string|max:20',
            'no_kk' => 'required|string|size:16',
            'status_dalam_keluarga' => 'required|string|max:50',
        ]);
        Resident::create($validated);
        return redirect()->route('residents.index')->with('success', 'Data berhasil ditambahkan.');
    }

    public function edit(Resident $resident)
    {
        return Inertia::render('Residents/Edit', [
            'resident' => $resident,
        ]);
    }

    public function update(Request $request, Resident $resident)
    {
        $validated = $request->validate([
            'nik' => 'required|string|size:16|unique:residents,nik,' . $resident->id,
            'nama_lengkap' => 'required|string|max:100',
            'jenis_kelamin' => 'required|in:L,P',
            'alamat' => 'required|string',
            'rt' => 'required|string|size:3',
            'rw' => 'required|string|size:3',
            'agama' => 'required|string|max:20',
            'pendidikan_terakhir' => 'required|string|max:20',
            'no_kk' => 'required|string|size:16',
            'status_dalam_keluarga' => 'required|string|max:50',
        ]);

        $resident->update($validated);
        return redirect()->route('residents.index')->with('success', 'Data berhasil diperbarui.');
    }

    public function destroy(Resident $resident)
    {
        $resident->delete();
        return redirect()->route('residents.index')->with('success', 'Data berhasil dihapus.');
    }
}
