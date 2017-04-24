package com.vequn.net;

import com.alibaba.fastjson.JSON;
import com.vequn.constat.Command;
import com.vequn.model.Cmd;
import com.vequn.model.PlayCardModel;
import com.vequn.model.Player;
import com.vequn.model.RoomId;
import com.vequn.model.RoomLevelModel;
import com.vequn.skpk.cardhand.Reminder;
import com.vequn.skpk.grade.Integral;
import com.vequn.skpk.player.DropLogin;
import com.vequn.skpk.player.PlayerManager;
import com.vequn.skpk.room.RoomManager;
import com.vequn.skpk.start.PlayPokers;
import com.vequn.skpk.utils.JOUtil;

import io.netty.channel.ChannelHandlerContext;

public class Broadcast {
	public static void broadcast(String message, ChannelHandlerContext current_ctx) {
		Cmd cmd = JSON.parseObject(message, Cmd.class);
		Object[] msgs = cmd.getMsg();
		switch (cmd.getCmd()) {
		case Command.CMD_1:	//-------->登录
			Player player = (Player) JOUtil.toObject(msgs[0], Player.class);
			PlayerManager.playerLogin(player, current_ctx);
			break;
		case Command.CMD_3:	//-------->创建房间
			RoomLevelModel level2 = (RoomLevelModel) JOUtil.toObject(msgs[0], RoomLevelModel.class);
			RoomManager.createRoom(cmd, current_ctx, level2.getLevel());
			break;
		case Command.CMD_6:	//-------->加入房间
			RoomId roomId = (RoomId) JOUtil.toObject(msgs[0], RoomId.class);
			RoomManager.joinRoom(roomId, cmd, current_ctx);
			break;
		case Command.CMD_9: //--------->退出房间，清除房间信息
			RoomManager.roomOut(cmd, current_ctx);
			break;
		case Command.CMD_10:	//------->准备
			RoomManager.ready(cmd, current_ctx);
			break;
		case Command.CMD_11:	//------->取消准备
			RoomManager.cancelReady(cmd, current_ctx);
			break;
		case Command.CMD_15: //--------->玩家点击出牌
			PlayCardModel playCardModel = (PlayCardModel) JOUtil.toObject(msgs[0], PlayCardModel.class);
			PlayPokers.play(playCardModel, current_ctx, cmd);
			break;
		case Command.CMD_16: //--------->玩家点击提示
			Reminder.getReminder(current_ctx, cmd);
			break;
		case Command.CMD_18: //--------->玩家过牌，并广播
			PlayPokers.play(null, current_ctx, cmd);
			break;
		case Command.CMD_23: //--------->倒计时结束，过牌
			PlayPokers.play(null, current_ctx, cmd);
			break;
		case Command.CMD_24: //-------->倒计时结束，必须出牌
			PlayPokers.mustSendCards(cmd, current_ctx);
			break;
		case Command.CMD_28: //--------->玩家单局积分结算
			Integral.integralCalc(cmd, current_ctx);
			break;
		case Command.CMD_31: //--------->申请解散房间
			RoomManager.roomOuts(current_ctx, cmd);
			break;
		case Command.CMD_32: //--------->确认解散房间
			RoomManager.confirmRoomOuts(current_ctx, cmd);
			break;
		case Command.CMD_36: //--------->掉线玩家上线，确认恢复数据
			Player dropPlayer = (Player) JOUtil.toObject(msgs[0], Player.class);
			DropLogin.login(cmd, current_ctx, dropPlayer);
			break;
		case Command.CMD_37: //--------->房间中游戏未开始前，房主点击退出房间询问是否解散房间
			RoomManager.roomOut(cmd, current_ctx);
			break;
		case Command.CMD_38: //--------->房间中游戏未开始前,房主确认解散房间
			RoomManager.roomHostRoomOuts(current_ctx, cmd);
			break;
		default:
			break;
		}
	}
}
