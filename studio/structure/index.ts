import type { StructureResolver } from "sanity/structure";
import { CogIcon } from "@sanity/icons/Cog";
import { HomeIcon } from "@sanity/icons/Home";
import { DocumentIcon } from "@sanity/icons/Document";
import { InboxIcon } from "@sanity/icons/Inbox";

const singleton = (S: Parameters<StructureResolver>[0], type: string, title: string, icon = DocumentIcon) =>
  S.listItem().title(title).icon(icon).child(S.document().schemaType(type).documentId(type).title(title));

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Aretus Enterprises")
    .items([
      S.listItem()
        .title("New enquiries")
        .icon(InboxIcon)
        .child(S.documentList().title("New enquiries").filter('_type == "enquiry" && status == "new"').defaultOrdering([{ field: "submittedAt", direction: "desc" }])),
      S.documentTypeListItem("enquiry").title("All enquiries"),
      S.divider(),
      singleton(S, "siteSettings", "Site settings", CogIcon),
      singleton(S, "homePage", "Home page", HomeIcon),
      S.listItem()
        .title("Pages")
        .icon(DocumentIcon)
        .child(
          S.list()
            .title("Pages")
            .items([
              singleton(S, "aboutPage", "About"),
              singleton(S, "servicesPage", "Services"),
              singleton(S, "fleetPage", "Fleet"),
              singleton(S, "projectsPage", "Projects"),
              singleton(S, "clientsPage", "Clients"),
              singleton(S, "faqPage", "FAQs"),
              singleton(S, "contactPage", "Contact"),
            ]),
        ),
      S.divider(),
      S.documentTypeListItem("service").title("Services"),
      S.documentTypeListItem("fleetUnit").title("Fleet"),
      S.documentTypeListItem("project").title("Projects"),
      S.documentTypeListItem("client").title("Clients"),
      S.documentTypeListItem("faq").title("FAQs"),
    ]);
