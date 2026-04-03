
-- Drop the overly permissive insert policy and recreate with a more explicit check
DROP POLICY IF EXISTS "Anyone can create leads" ON public.leads;
CREATE POLICY "Anyone can create leads" ON public.leads
  FOR INSERT WITH CHECK (
    source IS NOT NULL AND source IN ('palestra', 'contato', 'blog')
  );
