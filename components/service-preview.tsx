import { BookOpenCheck, Tag, Users, Clock } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export function ServicePreview() {
  const features = [
    {
      icon: Tag,
      title: "합리적인 가격",
      description: "경매 시스템으로 공정한 가격에 거래하세요",
    },
    {
      icon: Users,
      title: "학우들과 직거래",
      description: "같은 학교 학생들과 안전하게 거래하세요",
    },
    {
      icon: Clock,
      title: "실시간 경매",
      description: "원하는 책의 경매에 실시간으로 참여하세요",
    },
    {
      icon: BookOpenCheck,
      title: "전공책 특화",
      description: "전공별 교재를 쉽게 찾고 거래하세요",
    },
  ];

  return (
    <div className="h-full w-full flex flex-col items-center justify-center p-8 bg-gradient-to-br from-brand-50 via-white to-brand-50">
      <div className="max-w-md space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">더 이상 비싼 전공책 구매는 그만!</h2>
          <p className="text-gray-600">학우들과 함께 더 저렴하게 책을 거래하세요.</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {features.map((feature) => (
            <Card key={feature.title} className="border-2">
              <CardContent className="p-4 space-y-2">
                <feature.icon className="h-6 w-6 text-brand-600" />
                <h3 className="font-semibold">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
