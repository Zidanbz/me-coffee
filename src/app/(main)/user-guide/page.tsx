import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { getTranslations } from "next-intl/server";


export default async function UserGuidePage() {
  const t = await getTranslations('UserGuide');
  return (
    <div className="flex flex-col gap-6">
      <h1 className="text-2xl font-bold md:text-3xl font-headline">{t('title')}</h1>
      <Card>
        <CardHeader>
          <CardTitle>{t('welcomeTitle')}</CardTitle>
          <CardDescription>
           {t('welcomeDesc')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-lg font-semibold">{t('dashboardTitle')}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  {t('dashboardContent1')}
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>{t('dashboardContent2')}</strong>
                    <ul className="list-disc pl-6 mt-2">
                        <li><strong>{t('dashboardContent3')}</strong></li>
                        <li><strong>{t('dashboardContent4')}</strong></li>
                        <li><strong>{t('dashboardContent5')}</strong></li>
                        <li><strong>{t('dashboardContent6')}</strong></li>
                    </ul>
                  </li>
                  <li>
                    <strong>{t('dashboardContent7')}</strong>
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-lg font-semibold">{t('transactionsTitle')}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                 <p>
                  {t('transactionsContent1')}
                </p>
                <div className="space-y-3">
                    <h4 className="font-semibold">{t('transactionsContent2')}</h4>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>{t('transactionsContent3')}</li>
                        <li>{t('transactionsContent4')}</li>
                        <li>{t('transactionsContent5')}
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                            <li><strong>{t('transactionsContent6')}</strong></li>
                            <li><strong>{t('transactionsContent7')}</strong></li>
                            <li><strong>{t('transactionsContent8')}</strong></li>
                            <li><strong>{t('transactionsContent9')}</strong></li>
                            <li><strong>{t('transactionsContent10')}</strong></li>
                             <li><strong>{t('transactionsContent11')}</strong></li>
                            </ul>
                        </li>
                        <li>{t('transactionsContent12')}</li>
                    </ol>
                </div>
                 <div className="space-y-3">
                    <h4 className="font-semibold">{t('transactionsContent13')}</h4>
                     <ol className="list-decimal pl-6 space-y-2">
                        <li>{t('transactionsContent14')}</li>
                        <li>{t('transactionsContent15')}
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>{t('transactionsContent16')}</strong></li>
                                <li><strong>{t('transactionsContent17')}</strong></li>
                            </ul>
                        </li>
                        <li>{t('transactionsContent18')}</li>
                    </ol>
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger className="text-lg font-semibold">{t('hppTitle')}</AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p>
                  {t('hppContent1')}
                </p>
                <div className="space-y-3">
                    <h4 className="font-semibold">{t('hppContent2')}</h4>
                    <ol className="list-decimal pl-6 space-y-2">
                        <li>{t('hppContent3')}</li>
                        <li>
                            <strong>{t('hppContent4')}</strong>
                            <ul className="list-disc pl-6 mt-2 space-y-1">
                                <li><strong>{t('hppContent5')}</strong></li>
                                <li><strong>{t('hppContent6')}</strong></li>
                                <li><strong>{t('hppContent7')}</strong></li>
                                <li><strong>{t('hppContent8')}</strong></li>
                            </ul>
                        </li>
                         <li>
                            <strong>{t('hppContent9')}</strong>
                        </li>
                        <li>{t('hppContent10')}</li>
                    </ol>
                </div>
                 <div className="space-y-3">
                    <h4 className="font-semibold">{t('hppContent11')}</h4>
                     <p>
                       {t('hppContent12')}
                    </p>
                </div>
                <div className="space-y-3">
                    <h4 className="font-semibold">{t('hppContent13')}</h4>
                     <ol className="list-decimal pl-6 space-y-2">
                        <li>{t('hppContent14')}</li>
                        <li>
                           {t('hppContent15')}
                        </li>
                        <li>
                           {t('hppContent16')}
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
