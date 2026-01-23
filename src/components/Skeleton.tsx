import { Card, CardContent, CardHeader } from "../components/ui/card"
import { Skeleton } from "../components/ui/skeleton"

export function SkeletonCard() {
    return (
        <Card className="w-full max-w-xs rounded-[24px] overflow-hidden bg-[#CCD1F3] shadow-[0px_4px_20px_0px_rgba(0,0,0,0.25)] border border-white">
            <CardHeader>
                <Skeleton className="h-4 w-2/3" />
                <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
                <Skeleton className="aspect-video w-full" />
            </CardContent>
        </Card>
    )
}
