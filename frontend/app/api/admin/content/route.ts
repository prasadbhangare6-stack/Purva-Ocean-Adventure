import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requirePermission } from "@/lib/auth/guards";
import type { Resource, Action } from "@/lib/auth/roles";
import { getLiveSiteContentStore, saveSiteContentStore } from "@/lib/data/siteStore";

export const runtime = "nodejs";

// Public GET allows client components (UpcomingTripsShowcase, OceanGalleryShowcase, etc.)
// to fetch live data without throwing 401 Unauthorized for public visitors.
export async function GET() {
  try {
    const store = await getLiveSiteContentStore();
    return NextResponse.json(
      { success: true, data: store },
      {
        headers: {
          "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
        },
      }
    );
  } catch (error) {
    console.error("[api/admin/content] GET error:", error);
    return NextResponse.json({ success: false, message: "Error reading site content." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { resource, action = "update", data } = body as {
      resource: Resource;
      action?: Action;
      data: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any
    };

    if (!resource) {
      return NextResponse.json({ success: false, message: "Resource name required." }, { status: 400 });
    }

    // Server-side permission enforcement for mutations
    await requirePermission(resource, action, { mode: "throw" });

    const store = await getLiveSiteContentStore();

    switch (resource) {
      case "trips": {
        if (action === "delete") {
          const slugToDelete = data.slug;
          store.trips = store.trips.filter((t) => t.slug !== slugToDelete);
        } else {
          // create or update with sanitized remainingSpots
          const cleanTripData = { ...data };
          if (cleanTripData.remainingSpots !== undefined) {
            const parsed = parseInt(String(cleanTripData.remainingSpots), 10);
            cleanTripData.remainingSpots = isNaN(parsed) ? 0 : Math.max(0, parsed);
          }
          const index = store.trips.findIndex((t) => t.slug === data.slug);
          if (index >= 0) {
            store.trips[index] = { ...store.trips[index], ...cleanTripData };
          } else {
            store.trips.push(cleanTripData as unknown as (typeof store.trips)[number]);
          }
        }
        break;
      }

      case "courses": {
        if (action === "delete") {
          const slugToDelete = data.slug;
          store.courses = store.courses.filter((c) => c.slug !== slugToDelete);
        } else {
          const index = store.courses.findIndex((c) => c.slug === data.slug);
          if (index >= 0) {
            store.courses[index] = { ...store.courses[index], ...data };
          } else {
            store.courses.push(data as unknown as (typeof store.courses)[number]);
          }
        }
        break;
      }

      case "gallery": {
        if (action === "delete") {
          const idToDelete = data.id;
          store.gallery = store.gallery.filter((g) => g.id !== idToDelete);
        } else {
          const index = store.gallery.findIndex((g) => g.id === data.id);
          if (index >= 0) {
            store.gallery[index] = { ...store.gallery[index], ...data };
          } else {
            store.gallery.push(data as unknown as (typeof store.gallery)[number]);
          }
        }
        break;
      }

      case "faq": {
        if (action === "delete") {
          const idToDelete = data.id;
          store.faqs = store.faqs.filter((f) => f.id !== idToDelete);
        } else {
          const index = store.faqs.findIndex((f) => f.id === data.id);
          if (index >= 0) {
            store.faqs[index] = { ...store.faqs[index], ...data };
          } else {
            store.faqs.push(data as unknown as (typeof store.faqs)[number]);
          }
        }
        break;
      }

      case "about": {
        store.about = { ...store.about, ...data };
        break;
      }

      case "instagram": {
        store.instagram = { ...store.instagram, ...data };
        break;
      }

      case "settings": {
        store.settings = { ...store.settings, ...data };
        break;
      }

      default:
        return NextResponse.json({ success: false, message: `Unsupported resource: ${resource}` }, { status: 400 });
    }

    const updated = await saveSiteContentStore(store);

    // Instant cache revalidation across all public pages
    try {
      revalidatePath("/", "layout");
      revalidatePath("/trips");
      revalidatePath("/trips", "layout");
      revalidatePath("/courses");
      revalidatePath("/gallery");
      revalidatePath("/faq");
      revalidatePath("/about");
      revalidatePath("/instagram");
      revalidatePath("/contact");
    } catch {
      // Non-critical during testing
    }

    return NextResponse.json({
      success: true,
      message: `Successfully saved ${resource} changes.`,
      data: updated,
    });
  } catch (error) {
    const isForbidden = error instanceof Error && error.name === "ForbiddenError";
    console.error("[api/admin/content] Mutation error:", error);
    return NextResponse.json(
      {
        success: false,
        message: isForbidden ? "Forbidden: You do not have permission for this action." : "Server error processing request.",
      },
      { status: isForbidden ? 403 : 500 }
    );
  }
}
