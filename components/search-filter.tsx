"use client";

import * as React from "react";
import { Search, SlidersHorizontal, X, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface SearchFilters {
  category: string;
  priceRange: [number, number];
  condition: string;
  sellerRating: number;
}

interface SearchFilterProps {
  isScrolled?: boolean;
  className?: string;
}

export function SearchFilter({ isScrolled, className }: SearchFilterProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [filters, setFilters] = React.useState<SearchFilters>({
    category: "all",
    priceRange: [0, 100000],
    condition: "all",
    sellerRating: 0,
  });
  const [recentSearches] = React.useState(["컴퓨터구조론", "경영학원론", "미적분학"]);
  const [popularSearches] = React.useState(["데이터베이스", "알고리즘", "마케팅"]);

  return (
    <div className={cn("relative w-full", className)}>
      <div className={cn("flex items-center gap-2 transition-all duration-200", isScrolled ? "scale-95" : "")}>
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            className="pl-10 pr-20 h-10 bg-gray-50 border-gray-200"
            placeholder={isScrolled ? "검색" : "책 제목, 저자, 학과 등으로 검색"}
            type="search"
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-gray-900">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-md">
                <SheetHeader>
                  <SheetTitle>검색 필터</SheetTitle>
                </SheetHeader>
                <div className="mt-6 space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label>정렬 기준</Label>
                      <Select defaultValue="latest">
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="정렬 기준 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="latest">최신순</SelectItem>
                          <SelectItem value="price-low">낮은 가격순</SelectItem>
                          <SelectItem value="price-high">높은 가격순</SelectItem>
                          <SelectItem value="bids">입찰 많은순</SelectItem>
                          <SelectItem value="ending-soon">마감 임박순</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>카테고리</Label>
                      <Select
                        value={filters.category}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="카테고리 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체</SelectItem>
                          <SelectItem value="it">IT/컴퓨터</SelectItem>
                          <SelectItem value="business">경영/경제</SelectItem>
                          <SelectItem value="medical">의학</SelectItem>
                          <SelectItem value="engineering">공학</SelectItem>
                          <SelectItem value="humanities">인문</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>가격 범위</Label>
                      <div className="pt-2">
                        <Slider
                          defaultValue={[0, 100000]}
                          max={100000}
                          step={1000}
                          value={filters.priceRange}
                          onValueChange={(value: number[]) =>
                            setFilters((prev) => ({ ...prev, priceRange: [value[0], value[1]] }))
                          }
                        />
                        <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
                          <span>{filters.priceRange[0].toLocaleString()}원</span>
                          <span>{filters.priceRange[1].toLocaleString()}원</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label>책 상태</Label>
                      <Select
                        value={filters.condition}
                        onValueChange={(value) => setFilters((prev) => ({ ...prev, condition: value }))}
                      >
                        <SelectTrigger className="mt-1.5">
                          <SelectValue placeholder="상태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">전체</SelectItem>
                          <SelectItem value="new">새 책</SelectItem>
                          <SelectItem value="like-new">거의 새 책</SelectItem>
                          <SelectItem value="good">좋음</SelectItem>
                          <SelectItem value="fair">보통</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label className="text-sm text-muted-foreground">최근 검색어</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {recentSearches.map((term) => (
                          <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                            {term}
                            <X className="ml-1 h-3 w-3" />
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm text-muted-foreground">인기 검색어</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {popularSearches.map((term, index) => (
                          <Badge key={term} variant="secondary" className="cursor-pointer hover:bg-gray-200">
                            {index + 1}. {term}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-7 w-7 text-gray-500 hover:text-gray-900">
                  <ArrowUpDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem>최신순</DropdownMenuItem>
                <DropdownMenuItem>낮은 가격순</DropdownMenuItem>
                <DropdownMenuItem>높은 가격순</DropdownMenuItem>
                <DropdownMenuItem>입찰 많은순</DropdownMenuItem>
                <DropdownMenuItem>마감 임박순</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  );
}
