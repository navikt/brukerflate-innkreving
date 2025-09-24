import {
    BodyShort,
    Detail,
    Dropdown,
    InternalHeader,
    Link,
    Spacer,
} from "@navikt/ds-react";
import { LeaveIcon, PersonGroupIcon } from "@navikt/aksel-icons";

interface BrukerDropdownProps {
    foretrukketBrukernavn: string;
    navIdent: string;
}

export function BrukerDropdown({
    foretrukketBrukernavn,
    navIdent,
}: BrukerDropdownProps) {
    return (
        <Dropdown>
            <InternalHeader.UserButton
                as={Dropdown.Toggle}
                name={foretrukketBrukernavn}
            />
            <Dropdown.Menu>
                <dl>
                    <BodyShort as="dt" size="small">
                        {foretrukketBrukernavn}
                    </BodyShort>
                    <Detail as="dd">{navIdent}</Detail>
                </dl>
                <Dropdown.Menu.Divider />
                <Dropdown.Menu.List>
                    <Dropdown.Menu.List.Item
                        as={Link}
                        href="/oauth2/login?prompt=select_account"
                    >
                        Bytt bruker <Spacer />{" "}
                        <PersonGroupIcon aria-hidden fontSize="1.5rem" />
                    </Dropdown.Menu.List.Item>
                    <Dropdown.Menu.List.Item
                        as={Link}
                        href="/oauth2/logout?prompt=select_account"
                    >
                        Logg ut <Spacer />{" "}
                        <LeaveIcon aria-hidden fontSize="1.5rem" />
                    </Dropdown.Menu.List.Item>
                </Dropdown.Menu.List>
            </Dropdown.Menu>
        </Dropdown>
    );
}