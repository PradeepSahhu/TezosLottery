import smartpy as sp

@sp.module
def main():
    class Lottery(sp.Contract):
        def __init__(self):
            self.data.players = {}  # key = nat, value = address
            self.data.ticket_cost = sp.tez(1)
            self.data.tickets_available = sp.nat(5)
            self.data.max_tickets = sp.nat(5)
            self.data.winner_address = sp.address("tz1eRu432Xjpitrksh55PxtYa7P6vrswFHwT")
            self.data.past_winners = {}

        @sp.entrypoint
        def buy_ticket(self):
            assert self.data.tickets_available > sp.nat(0), "TICKETS_NOT_AVAILABLE"
            assert sp.amount >= sp.tez(1), "INVALID_AMOUNT"
            self.data.players[sp.len(self.data.players)] = sp.sender
            self.data.tickets_available = sp.as_nat(self.data.tickets_available - 1)
            extra_balance = sp.amount - self.data.ticket_cost
            if extra_balance > sp.tez(0):
                sp.send(sp.sender, extra_balance)

        @sp.entrypoint
        def end_game(self):
            assert self.data.tickets_available == 0, "GAME_IS_STILL_NOT_ENDED"
            winner_id = sp.mod(sp.as_nat(sp.now - sp.timestamp(0)), self.data.max_tickets)
            self.data.winner_address = self.data.players[winner_id]
            self.data.past_winners[sp.len(self.data.past_winners)] = self.data.winner_address
            sp.send(self.data.winner_address, sp.balance)
            self.data.players = {}
            self.data.tickets_available = sp.nat(5)


@sp.add_test()
def test():
    admin = sp.test_account("admin")
    bob = sp.test_account("bob")
    alice = sp.test_account("alice")
    john = sp.test_account("john")
    jane = sp.test_account("jane")


    scenario = sp.test_scenario("Lottery", main)
    scenario.h1("Lottery Contract")
    scenario.h2("Deploy Contract")
    lottery = main.Lottery()
    scenario += lottery

   

    scenario.h2("Buy Ticket")
    lottery.buy_ticket(_sender = admin, _amount = sp.tez(1))
    lottery.buy_ticket(_sender = bob, _valid=False)
    lottery.buy_ticket(_sender = bob, _amount = sp.tez(1))
    lottery.buy_ticket(_sender = alice, _amount = sp.tez(1))
    lottery.buy_ticket(_sender = john, _amount = sp.tez(1))
    lottery.buy_ticket(_sender = jane, _amount = sp.tez(1))

    scenario.h2("End Game")
    lottery.end_game(_now = sp.timestamp(23))