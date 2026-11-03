import { describe, vi } from 'vitest';
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from 'react-router';
import NavBar from "./Navbar.jsx"

function renderNavbar() {
    render(
        <MemoryRouter>
            <NavBar />
        </MemoryRouter>
    );
}

describe("muestra los tres enlaces", () => {

    it("muestra los tres enlaces", () => {
        renderNavbar();
        expect(screen.getByRole("link", { name: /home/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /shop/i })).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /cart/i })).toBeInTheDocument();
    });

    it("con el carrito vacío, el contador muestra 0", () => {
        renderNavbar();
        expect(screen.getByText("0")).toBeInTheDocument();
    });
});