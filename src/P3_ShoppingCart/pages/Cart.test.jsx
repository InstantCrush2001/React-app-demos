import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Routes, Route, Outlet } from "react-router";
import Cart from "./Cart";
import { describe } from "vitest";

const products = [
    { id: 1, name: "Camisa", price: 10, img: "a.png" },
    { id: 2, name: "Gorra", price: 5, img: "b.png" },
];

// Padre de prueba: hace lo que hace tu Navbar, pero con datos que tú controlas
function Parent({ initialCart }) {
    const [cart, setCart] = useState(initialCart);
    return <Outlet context={{ cart, setCart, products }} />;
}

function renderCart(initialCart) {
    render(
        <MemoryRouter>
            <Routes>
                <Route element={<Parent initialCart={initialCart} />}>
                    <Route index element={<Cart />} />
                </Route>
            </Routes>
        </MemoryRouter>
    );
}

describe("Cart", () => {
    const initialCart = [
        { id: 1, quantity: 2 },
        { id: 2, quantity: 3 },
    ];

    it("Muestra una fila por producto", () => {
        renderCart(initialCart);
        expect(screen.getByText("Camisa")).toBeInTheDocument();
        expect(screen.getByText("Gorra")).toBeInTheDocument();
    });

    it("Calcula el total", () => {
        renderCart(initialCart);
        expect(screen.getByText(/Shopping cart:.*35/i)).toBeInTheDocument();
    });

    it("Remove saca el producto y recalcula el total", async () => {
        const user = userEvent.setup();
        renderCart(initialCart);
        await user.click(screen.getAllByRole("button", { name: /remove/i })[0]);
        expect(screen.queryByText("Camisa")).not.toBeInTheDocument();
        expect(screen.getByText("Gorra")).toBeInTheDocument();           // el otro sigue
        expect(screen.getByText(/Shopping cart:.*15/i)).toBeInTheDocument(); // el total se recalculó
    });

    it("+ sube la cantidad y el total", async () => {
        const user = userEvent.setup();
        renderCart(initialCart);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("2"); // antes
        await user.click(screen.getAllByRole("button", { name: "+"})[0]);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("3");  // después
        expect(screen.getByText(/Shopping cart:.*45/i)).toBeInTheDocument();
    });

    it("- baja la cantidad en una unidad y el total", async () => {
        const user = userEvent.setup();
        renderCart(initialCart);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("2"); // antes
        await user.click(screen.getAllByRole("button", { name: "-"})[0]);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("1");  // después
        expect(screen.getByText(/Shopping cart:.*25/i)).toBeInTheDocument();
    });

    it("- no baja de 1", async () => {
        const user = userEvent.setup();
        renderCart([{ id: 1, quantity: 1 }, { id: 2, quantity: 3 }]);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("1"); // antes
        await user.click(screen.getAllByRole("button", { name: "-"})[0]);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("1");  // después
        expect(screen.getByText(/Shopping cart:.*25/i)).toBeInTheDocument();
    });

    it("+ no sube de 99", async () => {
        const user = userEvent.setup();
        renderCart([{ id: 1, quantity: 99 }, { id: 2, quantity: 3 }]);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("99"); // antes
        await user.click(screen.getAllByRole("button", { name: "+"})[0]);
        expect(screen.getAllByRole("textbox")[0]).toHaveValue("99");  // después
        expect(screen.getByText(/Shopping cart:.*1005/i)).toBeInTheDocument();
    });

    it("Carrito vacío no rompe la página", () => {
        renderCart([]);
        expect(screen.queryAllByRole("textbox")).toHaveLength(0);
        expect(screen.queryByRole("button", { name: /remove/i })).not.toBeInTheDocument();
        expect(screen.getByText("Shopping cart: $0.00")).toBeInTheDocument();
    });

    it.each(["abc", "0", "-2", "2.5", "100", ""])(
        "ignora el valor inválido %j en el input",
        (invalid) => {
            renderCart(initialCart);
            fireEvent.change(screen.getAllByRole("textbox")[0], { target: { value: invalid } });
            expect(screen.getAllByRole("textbox")[0]).toHaveValue("2");
            expect(screen.getByText("Shopping cart: $35.00")).toBeInTheDocument();
        }
    );
});