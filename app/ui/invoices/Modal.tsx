import { updateHistory } from '@/app/lib/actions';
import { Sample } from '@/app/lib/definitions';

const handleSubmit = async (e: any) => {
    e.preventDefault();
    const idSelected = (document.getElementById('idSelected') as HTMLInputElement)?.value;

    console.log("handleSubmitted");

    try {
        console.log("enter try");
        const result = await updateHistory(idSelected);
        // Optionally, show success message or handle UI updates
        console.log(result);
    } catch (error) {
        console.error('Error updating sample:', error);
        // Handle error state or show error message
    }
};

export default function Modal({ sample, onClose }: { sample: Sample, onClose: any }) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl font-bold mb-4">Apakah Sampel ini sudah dialokasi kan di FASIH ?</h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">ID SBR:</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sample.idsbr}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Nama Perusahaan:</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sample.nama}</td>
                        </tr>
                        <tr>
                            <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">Petugas:</td>
                            <td className="px-6 py-4 whitespace-nowrap">{sample.pcl}</td>
                        </tr>
                        {/* Add other fields as needed */}
                    </tbody>
                </table>
                {/* Add other fields and form inputs as needed */}
                <div className="mt-4 flex justify-end gap-2">
                    <form onSubmit={handleSubmit} >
                        <input
                            id="idSelected"
                            name="idSelected"
                            type='hidden'
                            value={sample.idsbr}
                            className="peer block w-3/4 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                        />
                        <button
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded ml-2">
                            Save
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
