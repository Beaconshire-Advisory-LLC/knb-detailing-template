import { Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { approveReview, rejectReview } from "@/lib/actions/admin";
import { formatDate } from "@/lib/formatting";

export default async function AdminReviewsPage() {
  const supabase = await getSupabaseServerClient();
  const { data: reviews } = await supabase
    .from("reviews")
    .select("id, display_name, rating, body, approved, featured, source, created_at")
    .order("created_at", { ascending: false });

  const pending = (reviews ?? []).filter((r) => !r.approved);
  const approved = (reviews ?? []).filter((r) => r.approved);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Reviews</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Approve customer reviews to show them on the public site.
        </p>
      </header>

      <section>
        <h2 className="text-lg font-bold">
          Pending ({pending.length})
        </h2>
        {pending.length === 0 ? (
          <Card className="mt-3">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No reviews waiting for approval.
            </CardContent>
          </Card>
        ) : (
          <ul className="mt-3 space-y-3">
            {pending.map((r) => (
              <li key={r.id}>
                <Card>
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-center gap-1 text-primary">
                      {Array.from({ length: r.rating }).map((_, i) => (
                        <Star key={i} className="size-4 fill-current" aria-hidden />
                      ))}
                    </div>
                    <p className="text-sm">{r.body}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.display_name} ·{" "}
                      {formatDate(r.created_at, { weekday: undefined })}
                    </p>
                    <div className="flex gap-2">
                      <form action={approveReview} className="inline-block">
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="featured" value="false" />
                        <Button type="submit" size="sm">
                          Approve
                        </Button>
                      </form>
                      <form action={approveReview} className="inline-block">
                        <input type="hidden" name="id" value={r.id} />
                        <input type="hidden" name="featured" value="true" />
                        <Button type="submit" size="sm" variant="secondary">
                          Approve + feature
                        </Button>
                      </form>
                      <form action={rejectReview} className="inline-block">
                        <input type="hidden" name="id" value={r.id} />
                        <Button type="submit" size="sm" variant="ghost" className="text-destructive">
                          Reject
                        </Button>
                      </form>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section>
        <h2 className="text-lg font-bold">Approved ({approved.length})</h2>
        <ul className="mt-3 space-y-2">
          {approved.map((r) => (
            <li key={r.id}>
              <Card>
                <CardContent className="flex items-start justify-between gap-3 p-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium">
                      {r.display_name}
                      {r.featured && (
                        <Badge className="ml-2 bg-primary/10 text-primary">Featured</Badge>
                      )}
                    </p>
                    <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                      {r.body}
                    </p>
                  </div>
                  <form action={rejectReview} className="shrink-0">
                    <input type="hidden" name="id" value={r.id} />
                    <Button type="submit" variant="ghost" size="sm" className="text-destructive">
                      Remove
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
