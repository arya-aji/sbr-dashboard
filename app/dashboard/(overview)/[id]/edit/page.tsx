import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { fetchSampleById, fetchSamples } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
    const id = params.id;
    const [sampleId, samples] = await Promise.all([
        fetchSampleById(id),
        fetchSamples(),
    ]);

    if (!sampleId) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: 'SBR', href: '/dashboard' },
                    {
                        label: 'Ganti Sampel',
                        href: `/dashboard/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form sampleId={sampleId} samples={samples} />
        </main>
    );
}