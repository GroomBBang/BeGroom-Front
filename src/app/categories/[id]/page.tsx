import CategoryContainer from '@/features/search/components/CategoryContainer';

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const { id: categoryId } = await params;

  return <CategoryContainer categoryId={categoryId} />;
}
