import { useRef, type ReactNode, useLayoutEffect, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import { PageConTextProvider, PageWidth } from '@site/src/hooks/useContext';
import ScrollStack, { ScrollStackItem } from '@site/src/components/ReactBits/ScrollStack';
import { StarBound } from '@site/src/components/StarBound';
import Hero from '@site/src/components/Hero';
import BlogSection from '@site/src/components/BlogSection';
import ProjectSection from '@site/src/components/ProjectSection';

export default function Home(): ReactNode {
  const [page, setPage] = useState<number>(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const { siteConfig } = useDocusaurusContext();
  const { customFields } = siteConfig;

  useLayoutEffect(() => {
    const updatePage = () => {
      const rect = boxRef.current?.getBoundingClientRect();
      setPage(rect?.width ?? null);
    };
    updatePage();
  }, [boxRef.current]);

  return (
    <PageConTextProvider value={{ page }}>
      <Layout
        title={`${siteConfig.title}`}
        description={customFields?.description as string}
        noFooter={true}
      >
        <div ref={boxRef}>
          {
            page >= PageWidth.LARGE
              ? (
                  <div className="h-[calc(100vh-60px)] w-screen max-w-full relative">
                    <ScrollStack>
                      <ScrollStackItem>
                        <StarBound className="w-full overflow-hidden">
                          <Hero></Hero>
                        </StarBound>
                      </ScrollStackItem>
                      <ScrollStackItem>
                        <StarBound className="w-full overflow-hidden h-full">
                          <BlogSection />
                        </StarBound>
                      </ScrollStackItem>
                      <ScrollStackItem>
                        <StarBound className="w-full overflow-hidden h-full">
                          <ProjectSection />
                        </StarBound>
                      </ScrollStackItem>
                    </ScrollStack>
                  </div>
                )
              : (
                  <div>
                    <Hero></Hero>
                    <BlogSection />
                    <ProjectSection />
                  </div>
                )
          }
        </div>
      </Layout>
    </PageConTextProvider>
  );
}
