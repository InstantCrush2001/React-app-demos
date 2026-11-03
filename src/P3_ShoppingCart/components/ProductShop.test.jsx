import { vi } from 'vitest';
import {render, screen, fireEvent} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductShop from "./ProductShop";

function renderRow(overrides = {}) {
    const props = {
        name: "Mochila",
        price: 24,
        image: "mochila.png",
        quantity: 1,
        onItemClicked: vi.fn(), // función espía: registra si la llamaron y con qué
        ...overrides,
    };
    render(<ProductShop {...props} />);
    return props;               // devuelvo las props para poder revisar el espía
}

describe("ProductShop", () => {
    it("muestra el nombre y el precio", () => {
        renderRow()
        expect(screen.getByText("Mochila")).toBeInTheDocument();
        expect(screen.getByRole("spinbutton")).toHaveValue(1);
    });

    it("empieza en 1 y el botón menos está deshabilitado", () => {
        renderRow()
        expect(screen.getByRole("spinbutton")).toHaveValue(1);
        expect(screen.getByRole("button", { name: "-" })).toBeDisabled();
    });

    it("+ sube el número en pantalla", async () => {
    const user = userEvent.setup();
    renderRow();
    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByRole("spinbutton")).toHaveValue(2);
});

    it("- baja el número y se detiene en 1", async () => {
        const user = userEvent.setup();
        renderRow();
        const plus = screen.getByRole("button", { name: "+" });
        const minus = screen.getByRole("button", { name: "-" });

        await user.click(plus);                       // 1 → 2
        await user.click(plus);                       // 2 → 3
        await user.click(minus);                      // 3 → 2
        expect(screen.getByRole("spinbutton")).toHaveValue(2);

        await user.click(minus);                      // 2 → 1
        expect(screen.getByRole("spinbutton")).toHaveValue(1);
        expect(minus).toBeDisabled();                 // en 1, ya no se puede bajar
    });

    it("empieza en 99 y el botón más está deshabilitado", () => {
        renderRow()
        fireEvent.change(screen.getByRole("spinbutton"), { target: {value: "99"}});
        expect(screen.getByRole("button", { name: "+" })).toBeDisabled();
    });

    it("Add to Cart llama a la función con la cantidad elegida", async () => {
        const user = userEvent.setup();
        const { onItemClicked } = renderRow();

        await user.click(screen.getByRole("button", { name: "+" }));   // 1 → 2
        await user.click(screen.getByRole("button", { name: "+" }));   // 2 → 3
        await user.click(screen.getByRole("button", { name: /add to cart/i }));

        expect(onItemClicked).toHaveBeenCalledTimes(1);
        expect(onItemClicked).toHaveBeenCalledWith(3);
    });

    it("con un valor fuera de rango, Add to Cart no llama a la función", async () => {
    const user = userEvent.setup();
    const { onItemClicked } = renderRow();

    fireEvent.change(screen.getByRole("spinbutton"), { target: { value: "500" } });
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(onItemClicked).not.toHaveBeenCalled();

    });
});